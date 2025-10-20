/**
 * Defines the possible C/C++ file types.
 */
export const FileTypes = {
    Header: 'Header',
    Source: 'Source',
    EmptyHeader: 'EmptyHeader',
    TemplateClassHeader: 'TemplateClassHeader',
    Test: 'Test',
} as const;

/**
 * Represents a C/C++ file type.
 */
export type FileType = (typeof FileTypes)[keyof typeof FileTypes];

/**
 * Determines whether the given file type is either Source or Test.
 *
 * @param type The file type to check.
 * @returns `true` if the file type is Source or Test; otherwise `false`.
 * @throws `Error` if the type is unknown.
 */
export function isSourceOrTest(type: FileType): boolean {
    switch (type) {
    case FileTypes.Source: return true;
    case FileTypes.Test: return true;
    case FileTypes.Header: // fall through
    case FileTypes.EmptyHeader: // fall through
    case FileTypes.TemplateClassHeader: return false;
    default: throw new Error(`Unknown file type ${type}`);
    }
}
