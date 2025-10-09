import { Identifier } from "./identifier";
import { capitalizeFirst, isAlpha, isDigit, isLower, isUpper} from "./strings";

/**
 * Converts identifier to camelCase.
 *
 * @param identifier identifier to convert.
 * @returns the identifier name converted to camelCase.
 */
export function toCamelCase(identifier: Identifier): string {
    const words = splitIdentifier(identifier);
    return words
        .map((w, i) => i === 0 ? w.toLowerCase() : capitalizeFirst(w))
        .join("");
}

/**
 * Converts identifier to PascalCase.
 *
 * @param identifier identifier to convert.
 * @returns the identifier name converted to PascalCase.
 */
export function toPascalCase(identifier: Identifier): string {
    const words = splitIdentifier(identifier);
    return words.map(capitalizeFirst).join("");
}

/**
 * Converts identifier to snake_case.
 *
 * @param identifier identifier to convert.
 * @returns the identifier name converted to snake_case.
 */
export function toSnakeCase(identifier: Identifier): string {
    const words = splitIdentifier(identifier);
    return words.map(w => w.toLowerCase()).join("_");
}

/**
 * Converts identifier to SCREAMING_SNAKE_CASE.
 *
 * @param identifier identifier to convert.
 * @returns the identifier name converted to SCREAMING_SNAKE_CASE.
 */
export function toScreamingSnakeCase(identifier: Identifier): string {
    const words = splitIdentifier(identifier);
    return words.map(w => w.toUpperCase()).join("_");
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
 * @param identifier identifier to split.
 * @returns array of words.
 */
export function splitIdentifier(identifier: Identifier): string[] {
    const name = identifier.name;
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
