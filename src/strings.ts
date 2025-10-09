/**
 * Checks if a string consists entirely of uppercase letters (A-Z).
 * 
 * Returns false if input is undefined, empty, or contains any non-uppercase letters.
 * 
 * @param str string to check.
 * @returns true if str consists of only uppercase letters.
 */
export function isUpper(str: string | undefined): boolean {
    return !!str && /^[A-Z]+$/.test(str);
}

/**
 * Checks if a string consists entirely of lowercase letters (a-z).
 * 
 * Returns false if input is undefined, empty, or contains any non-lowercase letters.
 * 
 * @param str string to check.
 * @returns true if str consists of only lowercase letters.
 */
export function isLower(str: string | undefined): boolean {
    return !!str && /^[a-z]+$/.test(str);
}

/**
 * Checks if a string consists entirely of digits (0-9).
 * 
 * Returns false if input is undefined, empty, or contains any non-digit characters.
 * 
 * @param str string to check.
 * @returns true if str consists only of digits.
 */
export function isDigit(str: string | undefined): boolean {
    return !!str && /^[0-9]+$/.test(str);
}

/**
 * Checks if character is a letter (upper or lower)
 * 
 * @param ch character to check (string of length 1).
 * @returns true if ch is a letter.
 */
export function isAlpha(ch: string): boolean {
    return ch.length === 1 && /^[A-Za-z]$/.test(ch);
}

/**
 * Uppercases the first character of a string and leaves the rest unchanged.
 *
 * @param str not empty string.
 * @returns string with the first character capitalized.
 */
export function capitalizeFirst(str: string): string {
    return str[0].toUpperCase() + str.slice(1);
}

/**
 * Lowercases the first character of a string and leaves the rest unchanged.
 *
 * @param str not empty string.
 * @returns string with the first character lowercase.
 */
export function lowercaseFirst(str: string): string {
    return str[0].toLowerCase() + str.slice(1);
}
