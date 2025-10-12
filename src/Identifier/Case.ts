/**
 * Cases represents enum of possible cases of identifier.
 */
export const Cases = {
    CamelCase: "camelCase",
    PascalCase: "PascalCase",
    SnakeCase: "snake_case",
    Untouched: "Untouched",
} as const;

/**
 * Case provides type for Cases enum.
 */
export type Case = (typeof Cases)[keyof typeof Cases];

/**
 * Creates Case from a string value.
 * @param value raw string to parse.
 * @returns corresponding case.
 * @throws Error if the string is not a valid Case.
 */
export function fromString(value: string): Case {
    if (Object.values(Cases).includes(value as Case)) {
        return value as Case;
    }
    throw new Error(`Unknown case name: ${value}`);
}
