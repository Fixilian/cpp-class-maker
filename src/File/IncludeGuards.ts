/**
 * Converts path to SCREAMING_SNAKE_CASE.
 * 
 * @param path correct Unix-style normalized path.
 * @returns path converted to SCREAMING_SNAKE_CASE.
 */
export function toScreamingSnakeCase(path: string): string {
    return path.replace(/\//g, "_").toUpperCase();
}

/**
 * Converts path to SCREAMING_SNAKE_CASE with double underscores.
 * 
 * Example: lib/core/utils -> LIB__CORE__UTILS
 * 
 * @param path correct Unix-style normalized path.
 * @returns path converted to SCREAMING_SNAKE_CASE with double underscores.
 */
export function toDoubleScreamingSnakeCase(path: string): string {
    return path.replace(/\//g, "__").toUpperCase();
}
