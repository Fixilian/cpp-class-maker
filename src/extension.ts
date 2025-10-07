import * as vscode from 'vscode';
import { Callback, commandRegistry } from './commands';

// This method is called when extension is activated.
export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "cpp-class-maker" is now active!');

	commandRegistry.forEach((callback: Callback, name: string) => {
		const disposable = vscode.commands.registerCommand(name, callback);
		context.subscriptions.push(disposable);
	});
}

// This method is called when extension is deactivated
export function deactivate() {}
