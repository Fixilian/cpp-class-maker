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
 * Splits an identifier (camelCase, PascalCase, snake_case) into words.
 * Separates patterns like "2D", "3D" into a new word
 *
 * Examples:
 *  - "camelCase" -> ["camel", "Case"]
 *  - "PascalCase" -> ["Pascal", "Case"]
 *  - "snake_case" -> ["snake", "case"]
 *  - "XMLRequest" -> ["XML", "Request"]
 *  - "Vector2D" -> ["Vector", "2D"]
 *  - "Render3DView" -> ["Render", "3D", "View"]
 */
export function splitIdentifier(name: string): string[] {
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
