import { File, FileEdit } from '../core';

/**
 * Represents build system.
 */
export interface BuildSystem {

    /**
     * Adds a file to the build system by modifying
     * the necessary build configuration files.
     *
     * Implementations should return a list of file edits that describe
     * all changes required to include the given file in the build.
     *
     * @param file The file to be added to the build system.
     * @returns The list of file edits representing the modifications to apply.
     */
    addFile(file: File): Promise<FileEdit[]>;
}
