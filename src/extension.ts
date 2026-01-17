import * as vscode from 'vscode';
import { ExtensionContextManager } from './extension/ExtensionContextManager';
import { CommandRegistry } from './extension/CommandRegistry';

// This method is called when extension is activated.
export function activate(context: vscode.ExtensionContext) {
    const ctxManager = new ExtensionContextManager(context);
    const registry = new CommandRegistry();

    for (const [id, command] of registry.commands) {
        const disposable = vscode.commands.registerCommand(id, async (uri: vscode.Uri) => {
            return await command(ctxManager, uri);
        });
		context.subscriptions.push(disposable);
    }
}

// This method is called when extension is deactivated
export function deactivate() {}
