import * as vscode from 'vscode';

/**
 * Workspace represents the workspace in which changes need to be made.
 */
export class Workspace {
    /** VS Code workspace folder. */
    readonly folder: vscode.WorkspaceFolder;

    /**
     * @param uri a URI within the workspace to uniquely identify the workspace.
     */
    constructor(uri: vscode.Uri) {
        const folder = this.findWorkspaceFolderFromUri(uri);
        if (!folder) {
            console.error("There is no any opened workspace");
            throw new Error("There is no workspace to create class");
        }
        this.folder = folder;
    }

    /**
     * Walks up the directory tree from the given uri until a workspace folder is found.
     *
     * @param uri starting uri (usually a file or directory path).
     * @returns workspace folder if found, or undefined if the uri is outside any workspace.
     */
    private findWorkspaceFolderFromUri(uri: vscode.Uri): vscode.WorkspaceFolder | undefined {
        // Loop until we reach the root or find a workspace folder
        let current = uri;
        while (true) {
            const folder = vscode.workspace.getWorkspaceFolder(current);
            if (folder) {
                return folder;
            }
            // Go one directory up
            const parentPath = vscode.Uri.joinPath(current, '..');
            // Stop if we reached the filesystem root
            if (parentPath.fsPath === current.fsPath) {
                return undefined;
            }
            current = parentPath;
        }
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
