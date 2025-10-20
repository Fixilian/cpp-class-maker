import { capitalizeFirst, isDigit, isLower, isUpper} from '../utils/Strings';
import { IdentifierCase, IdentifierCases } from '../core';
import { isAlpha } from '../utils/Chars';

/**
 * Converts identifier name to camelCase.
 *
 * @param identifier The identifier to convert.
 * @returns The identifier name converted to camelCase.
 */
export function toCamelCase(identifier: string): string {
    const words = splitIdentifier(identifier);
    return words
        .map((w, i) => i === 0 ? w.toLowerCase() : capitalizeFirst(w))
        .join('');
}

/**
 * Converts identifier name to PascalCase.
 *
 * @param identifier The identifier to convert.
 * @returns The identifier name converted to PascalCase.
 */
export function toPascalCase(identifier: string): string {
    const words = splitIdentifier(identifier);
    return words.map(capitalizeFirst).join('');
}

/**
 * Converts identifier name to snake_case.
 *
 * @param identifier The identifier to convert.
 * @returns The identifier name converted to snake_case.
 */
export function toSnakeCase(identifier: string): string {
    const words = splitIdentifier(identifier);
    return words.map(w => w.toLowerCase()).join('_');
}

/**
 * Converts identifier to SCREAMING_SNAKE_CASE.
 *
 * @param identifier The identifier to convert.
 * @returns The identifier name converted to SCREAMING_SNAKE_CASE.
 */
export function toScreamingSnakeCase(identifier: string): string {
    const words = splitIdentifier(identifier);
    return words.map(w => w.toUpperCase()).join('_');
}

/**
 * Converts identifier name to the specified identifier casing style.
 *
 * @param identifier The identifier to convert.
 * @param c The identifier casing style.
 * @return The identifier name converted to the specified casing style.
 */
export function convertCase(identifier: string, c: IdentifierCase): string {
    switch (c) {
    case IdentifierCases.CamelCase: return toCamelCase(identifier);
    case IdentifierCases.PascalCase: return toPascalCase(identifier);
    case IdentifierCases.SnakeCase: return toSnakeCase(identifier);
    case IdentifierCases.Untouched: return identifier;
    default: throw new Error(`Unknown identifier casing style ${c} to convert`);
    }
}

/**
 * Splits an identifier (camelCase, PascalCase, snake_case) into words.
 * Separates patterns like "2D", "3D" into a new word.
 *
 * Examples:
 *  - "camelCase" -> ["camel", "Case"]
 *  - "PascalCase" -> ["Pascal", "Case"]
 *  - "snake_case" -> ["snake", "case"]
 *  - "XMLRequest" -> ["XML", "Request"]
 *  - "Vector2D" -> ["Vector", "2D"]
 *  - "Render3DView" -> ["Render", "3D", "View"]
 *
 * @param identifier The identifier to split.
 * @returns An array of words.
 */
export function splitIdentifier(identifier: string): string[] {
    const name = identifier;
    const result: string[] = [];
    let current = "";

    for (let i = 0; i < name.length; i++) {
        const ch = name[i];
        const prev = name[i - 1];
        const next = name[i + 1];
        const next2 = name[i + 2];

        // Skip underscores and push the current token
        if (ch === "_") {
            if (current) {
                result.push(current);
                current = "";
            }
            continue;
        }

        let newToken = false;
        // 1. Acronym boundary: ABCd -> AB / Cd
        if (isUpper(prev) && isUpper(ch) && isLower(next)) {
            newToken = true;
        }
        // 2. 2D or 3D case
        if (isLower(prev) && isDigit(ch) && isUpper(next) && (!next2 || isAlpha(next2))) {
            newToken = true;
        }
        // 3. camelCase / PascalCase boundary
        if ((isLower(prev) && isUpper(ch)) ||
            (isDigit(prev) && isUpper(ch) && !isDigit(current))) {
            newToken = true;
        }

        if (newToken && current) {
            result.push(current);
            current = "";
        }
        current += ch;
    }

    if (current) {
        result.push(current);
    }
    return result;
}
