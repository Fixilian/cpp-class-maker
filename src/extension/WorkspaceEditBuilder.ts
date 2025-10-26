import * as vscode from 'vscode';
import { File, FileEdit } from '../core'
import { toUint8Array } from '../utils/Strings';

/**
 * WorkspaceEditBuilder builds vscode.WorkspaceEdit.
 * Do not use it after build() call.
 */
export class WorkspaceEditBuilder {
    /**
     * VS Code workspace edit.
     */
    private edit: vscode.WorkspaceEdit;

    constructor() {
        this.edit = new vscode.WorkspaceEdit();
    }

    /**
     * Creates a file with the specified content. If the file is already exists overwrites it.
     *
     * @param file The file to create.
     * @returns `WorkspaceEditBuilder`.
     */
    createFile(file: File): WorkspaceEditBuilder {
        const options = {
            overwrite: true,
            ignoreIfExists: false,
            contents: toUint8Array(file.content),
        };
        this.edit.createFile(file.uri, options);
        return this;
    }

    /**
     * Replaces text in the specified file.
     *
     * @param fileEdit File edit containing the target URI and text replacement.
     * @returns This builder instance for chaining.
     */
    replace(fileEdit: FileEdit): WorkspaceEditBuilder {
        const textEdit = fileEdit.textEdit;
        this.edit.replace(fileEdit.uri, textEdit.range, textEdit.newText);
        return this;
    }

    /**
     * Builds vscode.WorkspaceEdit.
     *
     * @returns the built edit.
     */
    build(): vscode.WorkspaceEdit {
        return this.edit;
    }
}
