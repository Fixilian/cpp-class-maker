import { IdentifierCase } from './IdentifierCase';
import * as identifiers from './Identifiers';

/**
 * Represents C/C++ identifier.
 */
export class Identifier {
    /**
     * The name of the identifier.
     */
    readonly name: string;

    /**
     * @param name The identifier name. Must be a valid C/C++ identifier.
     * @throws `Error` if the name is not a valid C/C++ identifier.
     */
    constructor(name: string) {
        if (!isIdentifier(name)) {
            throw new Error(`"${name}" is invalid C/C++ identifier`);
        }
        this.name = name;
    }

    /**
     * Converts name to camelCase.
     *
     * @returns The identifier name converted to camelCase.
     */
    toCamelCase(): string {
        return identifiers.toCamelCase(this.name);
    }

    /**
     * Converts name to PascalCase.
     *
     * @returns The identifier name converted to PascalCase.
     */
    toPascalCase(): string {
        return identifiers.toPascalCase(this.name);
    }

    /**
     * Converts name to snake_case.
     *
     * @returns The identifier name converted to snake_case.
     */
    toSnakeCase(): string {
        return identifiers.toSnakeCase(this.name);
    }

    /**
     * Converts name to SCREAMING_SNAKE_CASE.
     *
     * @returns The identifier name converted to SCREAMING_SNAKE_CASE.
     */
    toScreamingSnakeCase(): string {
        return identifiers.toScreamingSnakeCase(this.name);
    }

    /**
     * Converts identifier name to the specified identifier casing style.
     *
     * @param identifier The identifier to convert.
     * @param c The identifier casing style.
     * @return The identifier name converted to the specified casing style.
     */
    convertCase(c: IdentifierCase): string {
        return identifiers.convertCase(this.name, c);
    }
}

/**
 * Checks whether a string is a valid C/C++ identifier.
 *
 * Rules:
 * - May contain letters, digits (0–9), and underscores
 * - Cannot start with a digit
 * - Must not be empty
 * - Does not check for reserved keywords
 *
 * @param str The string to check.
 * @returns `true` if str is a valid identifier.
 */
export function isIdentifier(str: string | undefined): boolean {
    if (!str || str.length === 0) {
        return false;
    }
    // Regular expression for valid C/C++ identifiers
    // ^ start with [A-Za-z_] followed by zero or more [A-Za-z0-9_]
    return /^[A-Za-z_][A-Za-z0-9_]*$/.test(str);
}
