import * as path from 'path';
import { isSubDirectory } from '../utils/Paths';
import { ProjectLayout } from '../core';

/**
 * (HST - header source test) stores absolute paths to directories for new files.
 */
export class HstLocations {
    /**
     * The absolute path to the directory for the header file.
     */
    readonly headerLoc: string;

    /**
     * The absolute path to the directory for the source file.
     */
    readonly sourceLoc: string;

    /**
     * The absolute path to the directory for the test file.
     */
    readonly testLoc: string;

    /**
     * @param headerLoc The absolute path to the directory for the header file.
     * @param sourceLoc The absolute path to the directory for the source file.
     * @param testLoc The absolute path to the directory for the test file.
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
     * (I.e. looks like root_path/src_dir/tail or root_path/include_dir/tail)
     * then it returns object that looks like
     * ```ts
     * {
     *     headerPath : root_path/include_dir/tail,
     *     sourcePath : root_path/src_dir/tail,
     *     testPath : root_path/test_dir/tail,
     * }.
     * ```
     * But if dirPath contains test directory or not contains src_dir and include_dir
     * then all fields in object will be equal to dirPath.
     *
     * @param dirPath The absolute path containing root_path.
     * @returns Correct locations for files.
     */
    static to(dirPath: string, layout: ProjectLayout): HstLocations {
        const rootPath = layout.root.path;
        const includeDir = path.join(rootPath, layout.includeDir);
        const srcDir = path.join(rootPath, layout.sourceDir);
        const testDir = path.join(rootPath, layout.testDir);

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
