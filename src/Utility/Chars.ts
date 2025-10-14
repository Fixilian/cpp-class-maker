
/**
 * Checks if character is a letter (upper or lower)
 * 
 * @param ch character to check (string of length 1).
 * @returns true if ch is a letter.
 */
export function isAlpha(ch: string): boolean {
    return /^[A-Za-z]$/.test(ch);
}