/**
 * Represents supported programming languages.
 */
export const LanguageId = {
    C: 'C',
    Cpp: 'Cpp',
} as const;

/**
 * Union type of all supported languages.
 */
export type LanguageIdType = (typeof LanguageId)[keyof typeof LanguageId];
