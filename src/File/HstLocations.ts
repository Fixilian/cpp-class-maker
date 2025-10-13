import * as path from 'path';
import { isSubDirectory } from '../Utility/Paths';
import { Workspace } from '../Workspace/Workspace';

/**
 * HstLocations (HST - header source test) stores absolute paths to directories for new files.
 */
export class HstLocations {
    /** Absolute path to the directory for the header file. */
    readonly headerLoc: string;

    /** Absolute path to the directory for the source file. */
    readonly sourceLoc: string;

    /** Absolute path to the directory for the test file. */
    readonly testLoc: string;

    /**
     * @param headerLoc absolute path to the directory for the header file.
     * @param sourceLoc absolute path to the directory for the source file.
     * @param testLoc absolute path to the directory for the test file.
     */
    private constructor(headerLoc: string, sourceLoc: string, testLoc: string) {
        this.headerLoc = headerLoc;
        this.sourceLoc = sourceLoc;
        this.testLoc = testLoc;
    }

    /**
     * Generates correct locations for header, source file, test file from dirPath.
     * 
     * If dirPath contains src or include directories 
     * (I.e. looks like workspace_path/src_dir/tail or workspace_path/include_dir/tail) 
     * then it returns object that looks like 
     * ```ts
     * { 
     *     headerPath : workspace_path/include_dir/tail, 
     *     srcPath : workspace_path/src_dir/tail, 
     *     testPath : workspace_path/test_dir/tail,
     * }.
     * ```
     * But if dirPath contains test directory or not contains src_dir and include_dir 
     * then all fields in object will be equal to dirPath.
     * 
     * @param dirPath absolute path containing workspacePath.
     * @returns correct locations for files.
     */
    static to(dirPath: string, workspace: Workspace): HstLocations {
        const workspacePath = workspace.folder.uri.path;
        const includeDir = path.join(workspacePath, workspace.structure.includeDir);
        const srcDir = path.join(workspacePath, workspace.structure.sourceDir);
        const testDir = path.join(workspacePath, workspace.structure.testDir);

        const isSrcDir = isSubDirectory(srcDir, dirPath);
        const isIncludeDir = isSubDirectory(includeDir, dirPath);
        if (isSrcDir || isIncludeDir) {
            let tail = '';
            if (isIncludeDir) {
                tail = path.relative(includeDir, dirPath);
            } else {
                tail = path.relative(srcDir, dirPath);
            }
            const headerLoc = path.join(includeDir, tail);
            const srcLoc = path.join(srcDir, tail);
            const testLoc = path.join(testDir, tail);
            return new HstLocations(headerLoc, srcLoc, testLoc);
        }
        return new HstLocations(dirPath, dirPath, dirPath);
    }
}
