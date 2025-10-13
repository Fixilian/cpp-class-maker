import { File } from "../File/File";
import { FileEdit } from "../File/FileEdit";

/**
 * BuildSystem is a base class for build systems.
 */
export abstract class BuildSystem {

    /**
     * Adds a file to the build system by modifying
     * the necessary build configuration files.
     *
     * Implementations should return a list of file edits that describe
     * all changes required to include the given file in the build.
     *
     * @param file file to be added to the build system.
     * @returns list of file edits representing the modifications to apply.
     */
    abstract addFile(file: File): FileEdit[];
}
