import * as vscode from 'vscode';
import { ExtensionContextManager } from './ExtensionContextManager';
import { FileType, getLogger, Identifier, LanguageIdType } from '../core';
import { CommandContext } from './CommandContext';
import { IdentifierTypes, showIdentifierInputBox } from '../ui/showIdentifierInputBox';
import { FileFactory } from '../fileFactory';
import { WorkspaceContext } from './WorkspaceContext';
import { WorkspaceEditBuilder } from './WorkspaceEditBuilder';
import { FirstTimeSetup } from './FirstTimeSetup';
import { GeneralSettings } from '../settings';
import { Command } from './Command';
import { ExtensionError } from '../errors';
import { showErrorMessage } from '../ui/showErrorMessage';

/**
 * Factory for creating extension commands.
 */
export class CommandFactory {
    /**
     * Creates a command that generates source files for the specified language and file types.
     *
     * @param language Target language identifier.
     * @param fileTypes File types to create.
     * @returns A command ready for registration and execution.
     */
    create(language: LanguageIdType, fileTypes: FileType[]): Command {
        const command = async (ctxManager: ExtensionContextManager, uri: vscode.Uri) => {
            return await createFilesCommand(language, fileTypes, ctxManager, uri);
        };
        return command;
    }
}

/**
 * Executes the file creation command.
 *
 * @param language Target language identifier.
 * @param fileTypes File types to create.
 * @param ctxManager Extension context manager.
 * @param uri URI from file explorer.
 */
async function createFilesCommand(
    language: LanguageIdType,
    fileTypes: FileType[],
    ctxManager: ExtensionContextManager,
    uri: vscode.Uri
): Promise<void> {
    const log = getLogger();
    const name = await showIdentifierInputBox(IdentifierTypes.ClassName);
    if (!name) {
        return;
    }

    try {
        const ctx = new CommandContext(language, uri);
        const editBuilder = new WorkspaceEditBuilder();

        const identifier = new Identifier(name);
        const languageSettings = ctx.settingsManager.getLanguageSettings();
        const fileFactory = new FileFactory(identifier, ctx.destinationDir, ctx.projectLayout, languageSettings);

        const files = fileTypes.map((type: FileType) => fileFactory.create(type));
        for (const file of files) {
            editBuilder.createFile(file);
        }

        const workspaceCtx = await getWorkspaceContext(ctx, ctxManager);

        const buildSystem = workspaceCtx.getBuildSystem();
        if (buildSystem) {
            for (const file of files) {
                const edits = await buildSystem.addFile(file);
                for (const edit of edits) {
                    editBuilder.replace(edit);
                }
            }
        }

        const scm = workspaceCtx.getScm();
        if (scm) {
            await scm.addFiles(files);
        }

        const workspaceEdit = editBuilder.build();
        await vscode.workspace.applyEdit(workspaceEdit, {isRefactoring: true});

    } catch (err) {
        log.error('Fatal error: ', err);
        if (err instanceof ExtensionError) {
            await showErrorMessage(err.toString());
        }
    }
}

/**
 * Resolves or initializes the workspace context.
 *
 * @param ctx Current command context.
 * @param ctxManager Extension context manager.
 * @returns Active workspace context for the operation.
 */
async function getWorkspaceContext(ctx: CommandContext, ctxManager: ExtensionContextManager): Promise<WorkspaceContext> {
    const firstTimeSetup = new FirstTimeSetup(ctxManager.context);
    let settings: GeneralSettings | undefined;
    if (firstTimeSetup.isFirstTimeInteraction()) {
        settings = await firstTimeSetup.run();
    } else {
        settings = ctx.settingsManager.getGeneralSettings();
    }

    const folderName = ctx.workspaceFolder.name;
    const workspaceCtx = ctxManager.getWorkspaceContext(folderName);
    if (!workspaceCtx) {
        const newWorkspaceContext = await WorkspaceContext.create(ctx.fs, ctx.projectLayout, settings);
        ctxManager.addWorkspaceContext(folderName, newWorkspaceContext);
        return newWorkspaceContext;
    }
    await workspaceCtx.update(ctx.fs, ctx.projectLayout, settings);
    return workspaceCtx;
}
