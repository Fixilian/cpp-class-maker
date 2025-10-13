import * as vscode from 'vscode';
import * as path from 'path';

/**
 * Checks if dir is subdirectory of parent directory.
 * 
 * @param parent parent directory.
 * @param dir directory to check.
 * @returns true if dir is subdirectory of parent or if dir is equal to parent.
 */
export function isSubDirectory(parent: string, dir: string): boolean {
    const relative = path.relative(parent, dir);
    return !relative.startsWith('..') && !path.isAbsolute(relative);
}

/**
 * Visitor is a callback invoked for each directory during traversal.
 * 
 * @param uri - The uri of the current directory being visited.
 * @returns true to continue traversal upward, or false to stop.
 */
export type Visitor = (uri: vscode.Uri) => boolean | Promise<boolean>; 

/**
 * Traverses upward through parent directories starting from the given uri.
 * 
 * Calls the provided visitor function for each directory (starting from start)
 * until the callback returns false or the filesystem root is reached.
 * 
 * @param start the starting directory uri.
 * @param visitor callback invoked for each visited directory.
 */
export async function visitDirsUp(start: vscode.Uri, visitor: Visitor): Promise<void> {
    // Loop until we reach the root
    let current = start;
    while (true) {
        const wantContinue = await visitor(current);
        if (!wantContinue) {
            return;
        }
        // Go one directory up
        const parentPath = vscode.Uri.joinPath(current, '..');
        // Stop if we reached the filesystem root
        if (parentPath.fsPath === current.fsPath) {
            return;
        }
        current = parentPath;
    }
}

/**
 * Traverses upward through parent directories starting from the given uri.
 * 
 * Calls the provided visitor function for each directory (starting from start)
 * until the callback returns false or the filesystem root is reached.
 * 
 * @param start the starting directory uri.
 * @param visitor callback invoked for each visited directory.
 */
export async function visitDirsUpSync(start: vscode.Uri, visitor: Visitor) {
    // Loop until we reach the root
    let current = start;
    while (true) {
        const wantContinue = visitor(current);
        if (!wantContinue) {
            return;
        }
        // Go one directory up
        const parentPath = vscode.Uri.joinPath(current, '..');
        // Stop if we reached the filesystem root
        if (parentPath.fsPath === current.fsPath) {
            return;
        }
        current = parentPath;
    }
}