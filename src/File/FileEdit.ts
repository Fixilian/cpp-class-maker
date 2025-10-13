import * as vscode from 'vscode';

/**
 * FileEdit represents edit that should be applied to the file.
 */
export class FileEdit {
    /** File uri. */
    readonly uri: vscode.Uri;

    /** File text edit. */
    readonly textEdit: vscode.TextEdit;

    /**
     * @param uri file uri.
     * @param textEdit text edit that should be applied to the file.
     */
    constructor(uri: vscode.Uri, textEdit: vscode.TextEdit) {
        this.uri = uri;
        this.textEdit = textEdit;
    }
}
