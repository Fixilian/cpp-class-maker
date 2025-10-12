import * as vscode from 'vscode';
import { FileType } from './FileType';

/**
 * File represents a file of type FileType.
 */
export class File {
    /** File uri. */
    readonly uri: vscode.Uri;

    /** File type. */
    readonly type: FileType;

    /** File content. */
    readonly content: string;

    /**
     * @param uri file uri.
     * @param type file type.
     * @param content file content.
     */
    constructor(uri: vscode.Uri, type: FileType, content: string) {
        this.uri = uri;
        this.type = type;
        this.content = content;
    }
}
