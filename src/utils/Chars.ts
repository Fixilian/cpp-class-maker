/**
 * Checks if character is a letter (upper or lower)
 *
 * @param ch The character to check (string of length 1).
 * @returns `true` if ch is a letter.
 */
export function isAlpha(ch: string): boolean {
    const code = ch.charCodeAt(0);
    return isUpperLetter(code) || isLowerLetter(code);
}

/**
 * Checks if character is a whitespace.
 *
 * @param ch The character to check (string of length 1).
 * @returns `true` if the character is a whitespace.
 */
export function isWhitespace(ch: string): boolean {
    return ch === " " || ch === '\t' || ch === '\r' || ch === '\n';
}

/**
 * Checks if character is a upper letter (A-Z).
 *
 * @param ch The char code to check.
 * @returns `true` if the character is a upper letter.
 */
export function isUpperLetter(ch: number): boolean {
    return ch >= 65 && ch <= 90; // A-Z
}

/**
 * Checks if character is a lower letter (a-z).
 *
 * @param ch The char code to check.
 * @returns `true` if the character is a lower letter.
 */
export function isLowerLetter(ch: number): boolean {
    return ch >= 97 && ch <= 122; // a-z
}

/**
 * Checks if character is a digit (0-9).
 *
 * @param ch The char code to check.
 * @returns `true` if the character is a digit.
 */
export function isDigit(ch: number): boolean {
    return ch >= 48 && ch <= 57; // 0-9
}
