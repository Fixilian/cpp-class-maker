import * as path from 'path';

/**
 * Checks if dir is subdirectory of parent directory.
 * 
 * @param parent parent directory.
 * @param dir directory to check.
 * @returns true if dir is subdirectory of parent or if dir is equal to parent.
 */
export function isSubDirectory(parent: string, dir: string): boolean {
    const relative = path.relative(parent, dir);
    return !relative.startsWith('..') && !path.isAbsolute(relative);
}
