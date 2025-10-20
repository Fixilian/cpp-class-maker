import * as vscode from 'vscode';
import { isIdentifier } from '../core';
import { isDigit } from '../utils/Strings';
import { isAlpha } from '../utils/Chars';

/**
 * Defines available identifier types.
 */
export const IdentifierTypes = {
    FileName: 'FileName',
    ClassName: 'ClassName',
    StructName: 'StructName',
} as const;

/**
 * Represents a union type of all supported identifier kinds.
 */
export type IdentifierType = (typeof IdentifierTypes)[keyof typeof IdentifierTypes];

/**
 * Shows an input box for entering a C/C++ identifier.
 *
 * @param type The type of identifier to request from the user.
 * @returns A promise that resolves to the entered identifier, or `undefined` if the input was canceled.
 */
export async function showIdentifierInputBox(type: IdentifierType): Promise<string | undefined> {
    const options = new IdentifierInputBoxOptions(type);
    return vscode.window.showInputBox(options);
}

/**
 * Provides configuration options for the identifier input box.
 *
 * Used to customize title, placeholder, and validation logic
 * based on the requested identifier type.
 */
class IdentifierInputBoxOptions implements vscode.InputBoxOptions {

    readonly title: string;

    readonly placeHolder: string;

    constructor(type: IdentifierType) {
        switch (type) {
        case IdentifierTypes.ClassName:
            this.title = 'Enter class name';
            this.placeHolder = 'MyClass';
            break;
        case IdentifierTypes.StructName:
            this.title = 'Enter struct name';
            this.placeHolder = 'MyStruct';
            break;
        case IdentifierTypes.FileName:
            this.title = 'Enter file name';
            this.placeHolder = 'MyFile';
            break;
        default: throw new Error(`Unknown identifier type ${type}`);
        }
    }

    validateInput(value: string): vscode.InputBoxValidationMessage | undefined {
        if (isIdentifier(value)) {
            return undefined;
        }

        let message: string = 'Invalid name';
        if (value) {
            if (isDigit(value[0])) {
                message = 'Invalid name: the name cannot start with a digit';
            } else {
                const unexpectedChar = findUnexpectedChar(value);
                message = `Invalid name: unexpected character '${unexpectedChar}'`;
            }
        }

        const validationMessage = {
            message: message,
            severity: vscode.InputBoxValidationSeverity.Error,
        };
        return validationMessage;
    }
}

function findUnexpectedChar(value: string): string {
    for (let i = 0; i < value.length; i += 1) {
        const ch = value[i];
        if (!(isDigit(ch) || isAlpha(ch) || ch === '_')) {
            return ch;
        }
    }
    return '';
}
