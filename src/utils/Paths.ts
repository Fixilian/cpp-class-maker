import * as path from 'path';

/**
 * Checks if dir is subdirectory of parent directory.
 *
 * @param parent The parent directory.
 * @param dir The directory to check.
 * @returns `true` if dir is subdirectory of parent or if dir is equal to parent.
 */
export function isSubDirectory(parent: string, dir: string): boolean {
    const relative = path.relative(parent, dir);
    return !relative.startsWith('..') && !path.isAbsolute(relative);
}

/**
 * Converts path to SCREAMING_SNAKE_CASE.
 *
 * @param path The correct Unix-style normalized path.
 * @returns The path converted to SCREAMING_SNAKE_CASE.
 */
export function toScreamingSnakeCase(path: string): string {
    return path.replace(/\//g, '_').toUpperCase();
}

/**
 * Converts path to SCREAMING_SNAKE_CASE with double underscores.
 *
 * Example: lib/core/utils -> LIB__CORE__UTILS
 *
 * @param path The correct Unix-style normalized path.
 * @returns The path converted to SCREAMING_SNAKE_CASE with double underscores.
 */
export function toDoubleScreamingSnakeCase(path: string): string {
    return path.replace(/\//g, '__').toUpperCase();
}
