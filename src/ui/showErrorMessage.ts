import * as vscode from 'vscode';

/**
 * Displays an error message to the user.
 *
 * @param message The error message text to display.
 * @returns A promise that resolves once the message has been shown.
 */
export async function showErrorMessage(message: string): Promise<void> {
    await vscode.window.showErrorMessage(message);
}
