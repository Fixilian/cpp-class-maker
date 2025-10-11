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
