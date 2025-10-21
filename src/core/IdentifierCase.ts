import { UnknownEnumValueError } from '../errors';

/**
 * Defines the supported identifier casing styles.
 */
export const IdentifierCases = {
    CamelCase: 'camelCase',
    PascalCase: 'PascalCase',
    SnakeCase: 'snake_case',
    Untouched: 'Untouched',
} as const;

/**
 * Represents one of the supported identifier casing styles.
 */
export type IdentifierCase = (typeof IdentifierCases)[keyof typeof IdentifierCases];

/**
 * Converts a string value to a {@link IdentifierCase}.
 *
 * @param value - The raw string to convert.
 * @returns The corresponding {@link IdentifierCase} value.
 * @throws {UnknownEnumValueError} if the string does not match any known case style.
 */
export function fromString(value: string): IdentifierCase {
    if (Object.values(IdentifierCases).includes(value as IdentifierCase)) {
        return value as IdentifierCase;
    }
    throw new UnknownEnumValueError('IdentifierCases', value);
}
