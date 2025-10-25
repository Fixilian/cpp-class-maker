import * as vscode from 'vscode';

/**
 * Shows a confirmation message with Yes / No options.
 *
 * @param question The question to ask the user.
 * @param detail The detail of the question.
 * @returns True if "Yes", false if "No", or undefined if dismissed.
 */
export async function showConfirmMessage(question: string, detail: string): Promise<boolean | undefined> {
    const result = await vscode.window.showInformationMessage(
        question,
        { modal: true, detail: detail },
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
