/**
 * WorkspaceStructure represents the directory structure of the workspace.
 */
export class WorkspaceStructure {
    /** Relative path to the include directory. */
    readonly includeDir: string;

    /** Relative path to the source directory. */
    readonly sourceDir: string;

    /** Relative path to the test directory. */
    readonly testDir: string;

    /**
     * @param includeDir relative path to the include directory.
     * @param sourceDir relative path to the source directory.
     * @param testDir relative path to the test directory.
     */
    constructor(includeDir: string, sourceDir: string, testDir: string) {
        this.includeDir = includeDir;
        this.sourceDir = sourceDir;
        this.testDir = testDir;
    }
}
