import { BuildSystem } from '../BuildSystem';
import * as vscode from 'vscode';
import * as path from 'path';
import { CmakeParser } from './CmakeParser';
import { CmakeCommand } from './CmakeCommand';
import { File, FileEdit, FileSystem, isSourceOrTest } from '../../core';
import { getPosition } from '../../utils/PositionUtils';
import { getLogger, Logger } from '../../core';

export const CMAKE_FILE_NAME = 'CMakeLists.txt';

/**
 * Provides integration with the CMake build system.
 */
export class CmakeBuildSystem implements BuildSystem {
    /**
     * File system access used by the build system.
     */
    private readonly fs: FileSystem;

    private readonly log: Logger;

    /**
     * @param fs The file system interface used for file operations.
     */
    constructor(fs: FileSystem) {
        this.log = getLogger();
        this.fs = fs;
    }

    async addFile(file: File): Promise<FileEdit[]> {
        if (!isSourceOrTest(file.type)) {
            return [];
        }

        try {
            const cmakeUri = await this.findCmakeFile(file.uri);
            if (!cmakeUri) {
                return [];
            }

            const content = await this.fs.readFile(cmakeUri);
            return this.processCmakeFile(content, cmakeUri, file);

        } catch (err) {
            this.log.error(`Failed to add file ${file.uri.fsPath} to CMake`, err);
            return [];
        }
    }

    private processCmakeFile(content: string, cmakeUri: vscode.Uri, file: File): FileEdit[] {
        const parser = new CmakeParser(content);

        const commandsWithSourceFiles = ['set', 'add_library', 'add_executable'];
        const commands = parser.findCmakeCommands(commandsWithSourceFiles);
        if (commands.length === 0) {
            return [];
        }
        const command = this.selectCommandToInsert(commands, parser);

        const cmakeDir = vscode.Uri.joinPath(cmakeUri, '..');
        const relFilePath = path.relative(cmakeDir.path, file.uri.path);
        const offset = parser.findFileInsertPosition(command, relFilePath);

        const indent = this.getIndent(cmakeUri);
        const insertText = `\n${indent}${relFilePath}`;

        const position = getPosition(content, offset);
        const textEdit = vscode.TextEdit.insert(position, insertText);
        const fileEdit = { uri: cmakeUri, textEdit};
        return [fileEdit];
    }

    private selectCommandToInsert(commands: CmakeCommand[], parser: CmakeParser): CmakeCommand {
        const map = new Map<string, CmakeCommand>();
        for (let i = 0; i < commands.length; i += 1) {
            const command = commands[i];
            if (command.name === 'set') {
                const args = parser.parseCmakeCommandArgs(command);
                if (args[0].toLowerCase() !== 'sources') {
                    continue;
                }
            }
            if (!map.has(command.name)) {
                map.set(command.name, command);
            }
        }
        const setCommand = map.get('set');
        if (setCommand) {
            return setCommand;
        }
        const addLibraryCommand = map.get('add_library');
        if (addLibraryCommand) {
            return addLibraryCommand;
        }
        const addExecutableCommand = map.get('add_executable');
        if (addExecutableCommand) {
            return addExecutableCommand;
        }
        return commands[0]; // unreachable
    }

    private async findCmakeFile(uri: vscode.Uri): Promise<vscode.Uri | undefined> {
        let cmakeFile: vscode.Uri | undefined = undefined;
        let found = false;
        const startUri = vscode.Uri.joinPath(uri, '..');
        await this.fs.visitDirsUp(startUri, async (current: vscode.Uri) => {
            cmakeFile = vscode.Uri.joinPath(current, CMAKE_FILE_NAME);
            const exists = await this.fs.exists(cmakeFile);
            if (exists) {
                found = true;
            }
            return !exists;
        });
        if (found) {
            return cmakeFile;
        } else {
            return undefined;
        }
    }

    /**
     * Returns an indentation string for the given file,
     * based on VS Code settings (including .editorconfig).
     *
     * @param uri The URI of the file whose indentation should be determined.
     * @returns A string representing one indentation level (spaces or tab).
     */
    private getIndent(uri: vscode.Uri): string {
        const editorConfig = vscode.workspace.getConfiguration('editor', uri);
        const insertSpaces = editorConfig.get<boolean>('insertSpaces', true);
        const tabSize = editorConfig.get<number>('tabSize', 4);
        return insertSpaces ? ' '.repeat(tabSize) : '\t';
    }

    toString(): string {
        return 'CMake';
    }
}
