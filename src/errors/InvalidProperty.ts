import { ErrorCodes } from './ErrorCode';
import { ExtensionError } from './ExtensionError';

/**
 * Represents an error that occurs when a property is missing or has an invalid value or format.
 *
 * Extends {@link ExtensionError} and provides a specific {@link ErrorCodes.InvalidProperty} code.
 */
export class InvalidPropertyError extends ExtensionError {
    /**
     * @param property The name of the property that caused the error.
     * @param message A detailed description of what is invalid about the property.
     */
    constructor(property: string, message: string) {
        super(`Invalid property ${property}: ${message}`, ErrorCodes.InvalidProperty);
    }
}
