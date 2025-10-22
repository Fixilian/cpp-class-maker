import * as vscode from 'vscode';
import { File } from '../core';
import { SourceControlManager } from './SourceControlManager';
import { getLogger, Logger } from '../core/Logger';

/**
 * Provides methods to manage files in the Git source control system
 * using VS Code's built-in Git extension API.
 */
export class GitScm implements SourceControlManager {
    /**
     * Tracks files that should be automatically staged after saving.
     */
    private readonly stagedFiles: Set<vscode.Uri>;

    /**
     * Disposable for the workspace event listener.
     */
    private readonly disposable: vscode.Disposable;

    private readonly log: Logger;

    constructor() {
        this.stagedFiles = new Set();
        this.log = getLogger();

        this.disposable = vscode.workspace.onDidSaveTextDocument(document => {
            if (this.stagedFiles.has(document.uri) && this.isGitExtensionEnabled()) {
                this.stageFile(document.uri);
            }
        });
    }

    async addFiles(files: File[]): Promise<void> {
        if (!this.isGitExtensionEnabled()) {
            return;
        }
        for (const file of files) {
            const uri = file.uri;
            await this.stageFile(uri);
            this.stagedFiles.add(uri);
        }
    }

    dispose(): void {
        this.disposable.dispose();
    }

    /**
     * Stages a single file using VS Code’s built-in Git command.
     *
     * @param uri The URI of the file to stage.
     * @returns A promise that resolves when the command completes.
     */
    private async stageFile(uri: vscode.Uri): Promise<void> {
        try {
            await vscode.commands.executeCommand('git.stage', uri);
        } catch (err) {
            this.log.error(`[Git] Failed to stage file: ${uri.fsPath}`, err);
        }
    }

    /**
     * Checks if the built-in Git extension is active.
     *
     * @returns `true` if Git extension is installed and enabled.
     */
    private isGitExtensionEnabled(): boolean {
        const gitExtension = vscode.extensions.getExtension('vscode.git');
        return !!(gitExtension && gitExtension.isActive);
    }

    toString(): string {
        return 'Git';
    }
}
