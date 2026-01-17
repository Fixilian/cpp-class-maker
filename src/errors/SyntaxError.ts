import * as vscode from 'vscode';
import { ErrorCodes } from './ErrorCode';
import { ExtensionError } from './ExtensionError';

/**
 * Represents a syntax-related error.
 *
 * This error includes a message describing the issue and
 * a position (line and character) where it occurred in the document.
 */
export class SyntaxError extends ExtensionError {
    /**
     * The cursor position (zero-based) where the error occurred.
     */
    readonly position: vscode.Position;

    /**
     * @param message Description of the syntax issue.
     * @param position The cursor position (zero-based) where the error occurred.
     */
    constructor(message: string, position: vscode.Position) {
        const { line, character } = position;
        super(`Syntax error: ${message} at ${line + 1}:${character + 1}`, ErrorCodes.Syntax);
        this.position = position;
    }
}
