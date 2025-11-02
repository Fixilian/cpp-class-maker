import * as vscode from 'vscode';
import { FileSystem, ProjectLayout, VscodeFileSystem } from '../core';
import { LanguageIdType } from '../core/LanguageId';
import { SettingsManager } from '../settings';
import { WorkspaceError } from '../errors';

/**
 * Represents an execution context for a command.
 *
 * Provides access to the workspace folder, project layout, settings manager,
 * and the filesystem used by the command.
 */
export class CommandContext {
    /**
     * Absolute path to the directory where the command is executed.
     */
    readonly destinationDir: string;

    /**
     * Manages language-specific and workspace-related settings.
     */
    readonly settingsManager: SettingsManager;

    /**
     * File system interface used for file operations.
     */
    readonly fs: FileSystem;

    /**
     * Project layout containing key directories (root, source, include, test).
     */
    readonly projectLayout: ProjectLayout;

    /**
     * Workspace folder associated with the current command execution.
     */
    readonly workspaceFolder: vscode.WorkspaceFolder;

    /**
     * @param language Language identifier of the current project.
     * @param uri URI from file explorer.
     * @throws Error if the workspace folder cannot be determined.
     */
    constructor(language: LanguageIdType, uri: vscode.Uri) {
        this.fs = new VscodeFileSystem();

        const destinationUri = uri;
        this.destinationDir = destinationUri.path;

        const folder = vscode.workspace.getWorkspaceFolder(destinationUri);
        if (!folder) {
            throw new WorkspaceError('Failed to detect opened workspace');
        }
        this.workspaceFolder = folder;

        this.settingsManager = new SettingsManager(language, folder);
        const langSettings = this.settingsManager.getLanguageSettings();

        this.projectLayout = {
            root: folder.uri,
            includeDir: langSettings.getIncludeDirectoryPath(),
            sourceDir: langSettings.getSourceDirectoryPath(),
            testDir: langSettings.getTestDirectoryPath(),
        };
    }
}
