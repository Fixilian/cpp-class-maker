import * as vscode from 'vscode';
import { FileType } from './FileType';

/**
 * Represents a file with its type, URI, and content.
 */
export interface File {
    /**
     * The file URI.
     */
    readonly uri: vscode.Uri;

    /**
     * The file type.
     */
    readonly type: FileType;

    /**
     * The file content.
     */
    readonly content: string;
}
