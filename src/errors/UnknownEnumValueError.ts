import { ErrorCodes } from './ErrorCode';
import { ExtensionError } from './ExtensionError';

/**
 * Error thrown when a value does not match any entry of a specific enum.
 *
 * Extends {@link ExtensionError} and provides a specific {@link ErrorCodes.UnknownEnumValue} code.
 */
export class UnknownEnumValueError extends ExtensionError {
    /**
     * @param enumName Name of the enum where the value was expected.
     * @param value The invalid value that was not found in the enum.
     */
    constructor(enumName: string, value: string) {
        super(`${enumName} does not contain value ${value}`, ErrorCodes.UnknownEnumValue);
    }
}
