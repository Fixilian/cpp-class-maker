import * as vscode from 'vscode';
import { FileSystem, UriVisitor } from './FileSystem';
import { fromUint8Array } from '../utils/Strings';
import { IoError } from '../errors';

/**
 * Provides VS code virtual FS.
 */
export class VscodeFileSystem implements FileSystem {

    async exists(uri: vscode.Uri): Promise<boolean> {
        try {
            // Attempt to get file statistics. If the file doesn't exist, this will throw an error
            await vscode.workspace.fs.stat(uri);
            return true;
        } catch (err: any) {
            // Check if the error code indicates FileNotFound
            if (err && err.code === 'FileNotFound') {
                return false;
            }
            // Re-throw if it's not a FileNotFound error
            throw new IoError(`File existence check failed for ${uri.fsPath}`, err);
        }
    }

    async readFile(uri: vscode.Uri): Promise<string> {
        try {
            const content = await vscode.workspace.fs.readFile(uri);
            return fromUint8Array(content);
        } catch (err: any) {
            throw new IoError(`Failed to read file: ${uri.fsPath}`, err);
        }
    }

    async visitDirsUp(start: vscode.Uri, visitor: UriVisitor): Promise<void> {
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
}
