import * as vscode from 'vscode';

/**
 * Represents a callback invoked for each URI during traversal.
 *
 * @param uri The currently visited URI.
 * @returns `true` to continue traversal upward, or `false` to stop.
 */
export type UriVisitor = (uri: vscode.Uri) => boolean | Promise<boolean>;

/**
 * Provides file system operations used by the extension.
 */
export interface FileSystem {
    /**
     * Checks whether a file or directory exists at the given URI.
     *
     * @param uri The URI to check.
     * @returns A promise that resolves to `true` if the resource exists, or `false` otherwise.
     * @throws {IoError} when an I/O error occurs.
     */
    exists(uri: vscode.Uri): Promise<boolean>;

    /**
     * Reads the contents of a file as a string.
     *
     * @param uri The URI of the file to read.
     * @returns A promise that resolves to the file contents.
     * @throws {IoError} when an I/O error occurs.
     */
    readFile(uri: vscode.Uri): Promise<string>;

    /**
     * Visits each parent directory starting from the given URI upwards,
     * invoking the visitor callback for each directory.
     *
     * @param start The starting directory URI.
     * @param visitor A callback invoked for each directory visited.
     * @returns A promise that resolves when the traversal is complete.
     */
    visitDirsUp(start: vscode.Uri, visitor: UriVisitor): Promise<void>;
}
