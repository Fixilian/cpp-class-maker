/**
 * Identifier represents C/C++ identifier.
 */
export class Identifier {
    /** Identifier name. */
    readonly name: string;

    /**
     * @param name identifier name.
     */
    constructor(name: string) {
        if (!isIdentifier(name)) {
            throw new Error(`"${name}" is invalid C/C++ identifier`);
        }
        this.name = name;
    }
}

/**
 * Creates identifier with the specified name.
 * 
 * @param name identifier name. 
 * @returns identifier.
 */
export function asIdentifier(name: string): Identifier {
    return new Identifier(name);
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
 * @param str string to check.
 * @returns true if str is a valid identifier.
 */
export function isIdentifier(str: string | undefined): boolean {
    if (!str || str.length === 0) {
        return false;
    }
    // Regular expression for valid C/C++ identifiers
    // ^ start with [A-Za-z_] followed by zero or more [A-Za-z0-9_]
    return /^[A-Za-z_][A-Za-z0-9_]*$/.test(str);
}
