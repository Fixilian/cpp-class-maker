import { ErrorCode } from './ErrorCode';

/**
 * Represents an error specific to the extension.
 */
export class ExtensionError extends Error {
    /**
     * Unique code identifying the error type.
     */
    readonly code: ErrorCode;

    /**
     * Original error that caused this error, if any.
     */
    readonly cause?: any;

    /**
     * @param message Human-readable description of the error.
     * @param code Machine-readable code representing the error category.
     * @param cause Optional original error that triggered this error.
     */
    constructor(message: string, code: ErrorCode, cause?: any) {
        super(message);
        this.name = 'ExtensionError';
        this.code = code;
        this.cause = cause;
    }

    /**
     * Appends information about the original cause of the error to the given message.
     *
     * If this error has a `cause`, its stack trace (or message if stack is unavailable)
     * is appended to the provided message. Otherwise, the original message is returned unchanged.
     *
     * @param message The error message to which the cause information should be appended.
     * @returns The original message with cause details appended if a cause exists.
     */
    protected appendCauseTo(message: string): string {
        if (this.cause) {
            if (this.cause instanceof Error) {
                return message + `\nCaused by: ${this.cause.stack ?? this.cause.message}`;
            } else {
                return message + `\nCaused by: ${this.cause}`;
            }
        }
        return message;
    }

    toString(): string {
        return this.appendCauseTo(this.message);
    }
}
