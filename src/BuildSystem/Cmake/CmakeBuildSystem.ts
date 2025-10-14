import { File } from "../../File/File";
import { FileEdit } from "../../File/FileEdit";
import { isSourceOrTest } from "../../Types/FileType";
import { visitDirsUp } from "../../Utility/Paths";
import { BuildSystem } from "../BuildSystem";
import * as vscode from 'vscode';
import * as path from 'path';
import { Workspace } from "../../Workspace/Workspace";
import { fromUint8Array } from "../../Utility/Strings";
import { CmakeParser } from "./CmakeParser";
import { CmakeCommand } from "./CmakeCommand";

/**
 * CmakeBuildSystem represents CMake.
 */
export class CmakeBuildSystem extends BuildSystem {
    /** Current workspace. */
    private workspace: Workspace;

    /**
     * @param workspace current workspace. 
     */
    constructor(workspace: Workspace) {
        super();
        this.workspace = workspace;
    }

    async addFile(file: File): Promise<FileEdit[]> {
        if (!isSourceOrTest(file.type)) {
            return [];
        }
        const cmakeUri = await this.findCmakeFile(file.uri);
        if (!cmakeUri) {
            return [];
        }

        const content = await this.readFile(cmakeUri);
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

        let insertText = relFilePath + '\n';
        if (parser.needsNewlineBefore(offset)) {
            insertText = '\n' + insertText;
        }

        const position = parser.offsetToPosition(offset);
        const textEdit = vscode.TextEdit.insert(position, insertText);
        const fileEdit = new FileEdit(cmakeUri, textEdit);
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
        const startUri = vscode.Uri.joinPath(uri, "..");
        await visitDirsUp(startUri, async (current) => {
            cmakeFile = vscode.Uri.joinPath(current, 'CMakeLists.txt');
            const exists = await this.workspace.exists(cmakeFile);
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

    private async readFile(uri: vscode.Uri): Promise<string> {
        const content = await vscode.workspace.fs.readFile(uri);
        return fromUint8Array(content);
    }
}
