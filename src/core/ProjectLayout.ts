import * as vscode from 'vscode';

/**
 * Describes the layout of a project within a workspace.
 */
export interface ProjectLayout {
    /** 
     * Absolute URI of the project root directory.
     */
    readonly root: vscode.Uri;

    /** 
     * Relative path to the include directory from the project root.
     */
    readonly includeDir: string;

    /** 
     * Relative path to the source directory from the project root.
     */
    readonly sourceDir: string;

    /** 
     * Relative path to the test directory from the project root.
     */
    readonly testDir: string;
}
