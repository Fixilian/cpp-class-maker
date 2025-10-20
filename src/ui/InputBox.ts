import * as vscode from 'vscode';


export async function showInputBox(options: vscode.InputBoxOptions): Promise<string | undefined> {
    return vscode.window.showInputBox(options);
}

export class IdentifierInputOptions implements vscode.InputBoxOptions {
    
}
