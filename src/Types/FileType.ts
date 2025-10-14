/**
 * FileTypes represents enum of C/C++ file types.
 */
export const FileTypes = {
    Header: "Header",
    Source: "Source",
    EmptyHeader: "EmptyHeader",
    TemplateClassHeader: "TemplateClassHeader",
    Test: "Test",
} as const;

/**
 * FileType provides type for FileTypes enum.
 */
export type FileType = (typeof FileTypes)[keyof typeof FileTypes];

/**
 * Checks if file type is Test or Source.
 * 
 * @param type type to check. 
 * @returns true if type is Test or Source.
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
