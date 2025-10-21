import { ErrorCodes } from './ErrorCode';
import { ExtensionError } from './ExtensionError';

/**
 * Represents an I/O error in the extension.
 *
 * Extends {@link ExtensionError} and provides a specific error code for I/O failures.
 */
export class IoError extends ExtensionError {
    /**
     * @param message Human-readable description of the I/O error.
     */
    constructor(message: string, cause?: Error) {
        super(`I/O error: ${message}`, ErrorCodes.IoError, cause);
    }
}
