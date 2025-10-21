/**
 * Defines the possible errors codes.
 */
export const ErrorCodes = {
    Error: 'Error',
    InvalidIdentifier: 'InvalidIdentifier',
    IoError: 'IoError',
    UnknownEnumValue: 'UnknownEnumValue',
} as const;

/**
 * Represents an error code.
 */
export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];
