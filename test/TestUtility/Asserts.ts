/**
 * Checks if string is not empty and throws Error if it is empty.
 * 
 * @param str string to check.
 * @param name string name for error message.
 * @throws Error if str is empty.
 */
export function notEmpty(str: string | undefined, name: string) {
    if (!str || str.length === 0) {
        throw new Error(`String ${name} is empty.`);
    }
}
