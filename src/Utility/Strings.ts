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

/**
 * Returns the 0-based line and column position for a given character offset in text.
 * 
 * @param text full text to analyze.
 * @param offset zero-based character index within the text.
 * @returns position in form {line, column}.
 */
export function getPosition(text: string, offset: number): { line: number; column: number } {
    // Count lines up to the offset
    const str = text.slice(0, offset);
    let line = 0;
    let column = 0;
    for (let i = 0; i < str.length; i += 1) {
        if (str[i] === "\n") {
            line += 1;
            column = 0;
            continue;
        }   
        column += 1;
    }
    return {line: line, column: column};
}

/**
 * Converts string to Uint8Array.
 * 
 * @param text string to convert.
 * @returns converted string.
 */
export function toUint8Array(text: string): Uint8Array {
    const encoder = new TextEncoder();
    return encoder.encode(text);
}

/**
 * Converts Uint8Array to string.
 * 
 * @param array array to convert.
 * @returns converted string.
 */
export function fromUint8Array(array: Uint8Array): string {
    const decoder = new TextDecoder("utf-8");
    return decoder.decode(array);
} 
