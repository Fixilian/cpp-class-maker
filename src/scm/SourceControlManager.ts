import * as vscode from 'vscode';
import { File } from '../core';

/**
 * Manages interaction with the source control system.
 */
export interface SourceControlManager extends vscode.Disposable {

    /**
     * Adds files to source control tracking.
     *
     * @param files Files to add to source control.
     * @returns A promise that resolves when the operation completes.
     */
    addFiles(files: File[]): Promise<void>;
}
