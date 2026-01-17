import * as vscode from 'vscode';

/**
 * Represents edit that should be applied to the file.
 */
export interface FileEdit {
    /**
     * The file URI.
     */
    readonly uri: vscode.Uri;

    /**
     * The file text edit.
     */
    readonly textEdit: vscode.TextEdit;
}
