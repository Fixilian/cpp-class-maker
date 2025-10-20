import * as vscode from 'vscode';

/**
 * Shows a confirmation message with Yes / No options.
 *
 * @param question The question to ask the user.
 * @returns True if "Yes", false if "No", or undefined if dismissed.
 */
export async function showConfirmMessage(question: string): Promise<boolean | undefined> {
    const result = await vscode.window.showInformationMessage(
        question,
        { modal: true },
        'Yes',
        'No'
    );

    if (result === 'Yes') {
        return true;
    }
    if (result === 'No') {
        return false;
    }

    // User closed the message without choosing
    return undefined;
}
