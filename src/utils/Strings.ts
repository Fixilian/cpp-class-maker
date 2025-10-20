/**
 * Checks if a string consists entirely of uppercase letters (A-Z).
 *
 * Returns `false` if input is undefined, empty, or contains any non-uppercase letters.
 *
 * @param str The string to check.
 * @returns `true` if str consists of only uppercase letters.
 */
export function isUpper(str: string | undefined): boolean {
    return !!str && /^[A-Z]+$/.test(str);
}

/**
 * Checks if a string consists entirely of lowercase letters (a-z).
 *
 * Returns `false` if input is undefined, empty, or contains any non-lowercase letters.
 *
 * @param str The string to check.
 * @returns `true` if str consists of only lowercase letters.
 */
export function isLower(str: string | undefined): boolean {
    return !!str && /^[a-z]+$/.test(str);
}

/**
 * Checks if a string consists entirely of digits (0-9).
 *
 * Returns `false` if input is undefined, empty, or contains any non-digit characters.
 *
 * @param str The string to check.
 * @returns `true` if str consists only of digits.
 */
export function isDigit(str: string | undefined): boolean {
    return !!str && /^[0-9]+$/.test(str);
}

/**
 * Converts the first character of the given string to uppercase.
 *
 * @param str A non-empty string.
 * @returns The input string with its first character capitalized.
 */
export function capitalizeFirst(str: string): string {
    return str[0].toUpperCase() + str.slice(1);
}

/**
 * Converts the first character of the given string to lowercase.
 *
 * @param str A non-empty string.
 * @returns The input string with its first character in lowercase.
 */
export function lowercaseFirst(str: string): string {
    return str[0].toLowerCase() + str.slice(1);
}

/**
 * Converts a string into a `Uint8Array` using UTF-8 encoding.
 *
 * @param text The string to convert.
 * @returns The converted string.
 */
export function toUint8Array(text: string): Uint8Array {
    const encoder = new TextEncoder();
    return encoder.encode(text);
}

/**
 * Converts a `Uint8Array` back into a string using UTF-8 decoding.
 *
 * @param array The array to convert.
 * @returns The decoded string.
 */
export function fromUint8Array(array: Uint8Array): string {
    const decoder = new TextDecoder("utf-8");
    return decoder.decode(array);
}
