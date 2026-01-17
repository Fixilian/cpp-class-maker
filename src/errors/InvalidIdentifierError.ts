import { ErrorCodes } from './ErrorCode';
import { ExtensionError } from './ExtensionError';

/**
 * Error thrown when a string is not a valid C/C++ identifier.
 *
 * Extends {@link ExtensionError} and provides a specific {@link ErrorCodes.InvalidIdentifier} code.
 */
export class InvalidIdentifierError extends ExtensionError {
    /**
     * @param identifier The invalid identifier string that caused the error.
     */
    constructor(identifier: string) {
        super(`Invalid C/C++ identifier: ${identifier}`, ErrorCodes.InvalidIdentifier);
    }
}
