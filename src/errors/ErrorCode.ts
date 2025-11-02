/**
 * Defines the possible errors codes.
 */
export const ErrorCodes = {
    Error: 'Error',
    InvalidIdentifier: 'InvalidIdentifier',
    InvalidProperty: 'InvalidProperty',
    Io: 'Io',
    Syntax: 'Syntax',
    UnknownEnumValue: 'UnknownEnumValue',
    Wokspace: 'Workspace',
} as const;

/**
 * Represents an error code.
 */
export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];
