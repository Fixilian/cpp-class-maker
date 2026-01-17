import * as vscode from 'vscode';
import { WorkspaceContext } from './WorkspaceContext';

/**
 * Manages extension-wide context and active workspace contexts.
 *
 * Tracks all opened workspaces and automatically disposes
 * their resources when folders are removed from VS Code.
 */
export class ExtensionContextManager {
    /**
     * Global VS Code extension context.
     */
    readonly context: vscode.ExtensionContext;

    /**
     * Map of workspace names to their corresponding context instances.
     */
    private workspaces: Map<string, WorkspaceContext>;

    /**
     * @param context The VS Code extension context.
     */
    constructor(context: vscode.ExtensionContext) {
        this.context = context;
        this.workspaces = new Map();

        const disposable = vscode.workspace.onDidChangeWorkspaceFolders((event: vscode.WorkspaceFoldersChangeEvent) => {
            event.removed.forEach((folder: vscode.WorkspaceFolder) => {
                const workspace = this.workspaces.get(folder.name);
                if (workspace) {
                    workspace.dispose();
                    this.workspaces.delete(folder.name);
                }
            });
        });

        this.context.subscriptions.push(disposable);
    }

    /**
     * Returns the workspace context by its name.
     *
     * @param name Name of the workspace folder.
     * @returns The corresponding {@link WorkspaceContext}, or `undefined` if not found.
     */
    getWorkspaceContext(name: string): WorkspaceContext | undefined {
        return this.workspaces.get(name);
    }

    /**
     * Registers a new workspace context.
     *
     * @param name Name of the workspace folder.
     * @param workspaceContext The workspace context to associate with the folder.
     */
    addWorkspaceContext(name: string, workspaceContext: WorkspaceContext) {
        this.workspaces.set(name, workspaceContext);
    }
}
