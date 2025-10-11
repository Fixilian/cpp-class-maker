import * as path from 'path';

/**
 * ClassFilesPaths stores paths for header, source file, test file of class.
 */
export class ClassFilesPaths {
    /** Header file directory absolute path. */
    readonly headerPath: string;

    /** Source file directory absolute path. */
    readonly srcPath: string;

    /** Test file directory absolute path. */
    readonly testPath: string;

    /**
     * @param headerPath header file directory absolute path.
     * @param srcPath source file directory absolute path.
     * @param testPath test file directory absolute path.
     */
    constructor(headerPath: string, srcPath: string, testPath: string) {
        this.headerPath = headerPath;
        this.srcPath = srcPath;
        this.testPath = testPath;
    }
}

/**
 * PathGenerator generates correct paths for header, source file, test file of class.
 */
export class PathGenerator {
    /** Include directory absolute path. */
    readonly includePath: string;

    /** Source directory absolute path. */
    readonly srcPath: string;

    /** Test directory absolute path. */
    readonly testPath: string;

    /**
     * @param workspacePath workspace directory absolute path.
     * @param includePath include directory path.
     * @param srcPath source directory path.
     * @param testPath test directory path.
     */
    constructor(workspacePath: string, includePath: string, srcPath: string, testPath: string) {
        this.includePath = this.ensureDirPathIsAbsolute(workspacePath, includePath);
        this.srcPath = this.ensureDirPathIsAbsolute(workspacePath, srcPath);
        this.testPath = this.ensureDirPathIsAbsolute(workspacePath, testPath);
    }

    /**
     * Ensures that the dir path is absolute 
     * and the dir is a subdirectory of the workspace directory.
     * @param workspacePath workspace directory path.
     * @param dirPath directory path.
     * @returns directory absolute path.
     * @throws Error if dir is not a subdirectory of workspace directory.
     */
    private ensureDirPathIsAbsolute(workspacePath: string, dirPath: string): string {
        if (path.isAbsolute(dirPath)) {
            if (!isSubDirectory(workspacePath, dirPath)) {
                throw new Error(`path=${dirPath} is not a subdirectory of workspace path=${workspacePath}`);
            }
            return dirPath;
        } else {
            return path.join(workspacePath, dirPath);
        }
    }

    /**
     * Generates correct paths for header, source file, test file from dst_path.
     * If dst_path contains src_path or include_path 
     * (I.e. looks like workspace_path/src_path/tail or workspace_path/include_path/tail) 
     * then it returns object that looks like 
     * {
     *     headerPath : workspace_path/include_path/tail, 
     *     srcPath : workspace_path/src_path/tail, 
     *     testPath : workspace_path/test_path/tail,
     * }.
     * But if dst_path contains test_path or not contains src_path and include_path then all fields
     * in object will be equal to dst_path.
     * 
     * @param dstPath absolute path containing workspacePath.
     * @returns correct paths to class files.
     */
    generate(dstPath: string): ClassFilesPaths {
        const isSrcDir = isSubDirectory(this.srcPath, dstPath);
        const isIncludeDir = isSubDirectory(this.includePath, dstPath);
        if (isSrcDir || isIncludeDir) {
            let tail = '';
            if (isIncludeDir) {
                tail = path.relative(this.includePath, dstPath);
            } else {
                tail = path.relative(this.srcPath, dstPath);
            }
            const includePath = path.join(this.includePath, tail);
            const srcPath = path.join(this.srcPath, tail);
            const testPath = path.join(this.testPath, tail);
            return new ClassFilesPaths(includePath, srcPath, testPath);
        }
        return new ClassFilesPaths(dstPath, dstPath, dstPath);
    } 
}

/**
 * Checks if dir is subdirectory of parent directory.
 * 
 * @param parent parent directory.
 * @param dir directory to check.
 * @returns true if dir is subdirectory of parent or if dir is equal to parent.
 */
function isSubDirectory(parent: string, dir: string): boolean {
    const relative = path.relative(parent, dir);
    return !relative.startsWith('..') && !path.isAbsolute(relative);
}
