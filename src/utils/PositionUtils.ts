import * as vscode from 'vscode';

/**
 * Returns the position for a character offset in a text.
 *
 * @param text The full text to analyze.
 * @param offset Zero-based character index within the text.
 * @returns A text position.
 */
export function getPosition(text: string, offset: number): vscode.Position {
    const str = text.slice(0, offset);
    let line = 0;
    let column = 0;
    for (let i = 0; i < str.length; i += 1) {
        if (str[i] === '\n') {
            line += 1;
            column = 0;
            continue;
        }
        column += 1;
    }
    return new vscode.Position(line, column);
}
