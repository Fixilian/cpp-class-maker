import * as vscode from 'vscode';
import { WorkspaceStructure } from './WorkspaceStructure';
import { visitDirsUpSync } from '../Utility/Paths';

/**
 * Workspace represents the workspace in which changes need to be made.
 */
export class Workspace {
    /** VS Code workspace folder. */
    readonly folder: vscode.WorkspaceFolder;

    /** Directory structure of the workspace. */
    readonly structure: WorkspaceStructure;

    /**
     * @param uri a URI within the workspace to uniquely identify the workspace.
     */
    constructor(uri: vscode.Uri, structure: WorkspaceStructure) {
        const folder = this.findWorkspaceFolderFromUri(uri);
        if (!folder) {
            throw new Error("There is no workspace to create class");
        }
        this.folder = folder;
        this.structure = structure;
    }

    /**
     * Walks up the directory tree from the given uri until a workspace folder is found.
     *
     * @param uri starting uri (usually a file or directory path).
     * @returns workspace folder if found, or undefined if the uri is outside any workspace.
     */
    private findWorkspaceFolderFromUri(uri: vscode.Uri): vscode.WorkspaceFolder | undefined {
        let folder: vscode.WorkspaceFolder | undefined = undefined;
        visitDirsUpSync(uri, (current) => {
            folder = vscode.workspace.getWorkspaceFolder(current);
            return !folder;
        });
        return folder;
    }

    /**
     * Transforms file path to uri within the workspace.
     * 
     * @param filePath the absolute path within workspace to transform.
     * @returns uri within the workspace of the file.
     */
    toUri(filePath: string): vscode.Uri {
        const uri = this.folder.uri;
        return uri.with({path: filePath});
    }

    /**
     * Checks if file with the fileUri is already exists.
     * 
     * @param fileUri the uri to check.
     * @returns true if file exists.
     */
    async exists(fileUri: vscode.Uri): Promise<boolean> {
        try {
            // Attempt to get file statistics. If the file doesn't exist, this will throw an error
            await vscode.workspace.fs.stat(fileUri);
            return true;
        } catch (error: any) {
            // Check if the error code indicates FileNotFound
            if (error.code === 'FileNotFound') {
                return false;
            }
            console.error(`File existence check failed for ${fileUri.fsPath}:`, error);
            throw error; // Re-throw if it's not a FileNotFound error
        }
    }
}
