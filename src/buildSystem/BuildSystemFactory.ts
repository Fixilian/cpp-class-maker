import * as vscode from 'vscode';
import { FileSystem, ProjectLayout } from '../core';
import { BuildSystem } from './BuildSystem';
import { CMAKE_FILE_NAME, CmakeBuildSystem } from './cmake/CmakeBuildSystem';

/**
 * Creates the appropriate BuildSystem instance based on the project workspace contents.
 * Scans the workspace and returns the corresponding build system (e.g., CMakeBuildSystem).
 */
export class BuildSystemFactory {
    /**
     * File system used to inspect files and directories in the workspace.
     */
    private readonly fs: FileSystem;

    /**
     * Project layout that provides information about the structure of the workspace.
     */
    private readonly layout: ProjectLayout;

    /**
     * @param fs File system for reading project files.
     * @param layout Project layout information for determining workspace structure.
     */
    constructor(fs: FileSystem, layout: ProjectLayout) {
        this.fs = fs;
        this.layout = layout;
    }

    /**
     * Detects the type of build system used in the project
     * and returns the corresponding BuildSystem instance.
     *
     * @returns A Promise resolving to the appropriate BuildSystem implementation,
     * or undefined if no recognized build system is found.
     */
    async create(): Promise<BuildSystem | undefined> {
        const hasCmake = await this.hasCmake();
        if (hasCmake) {
            return new CmakeBuildSystem(this.fs);
        }
        return undefined;
    }

    private async hasCmake(): Promise<boolean> {
        const rootCmake = vscode.Uri.joinPath(this.layout.root, CMAKE_FILE_NAME);
        const rootExists = await this.fs.exists(rootCmake);
        if (rootExists) {
            return true;
        }

        const sourceCmake = vscode.Uri.joinPath(this.layout.root, this.layout.sourceDir, CMAKE_FILE_NAME);
        const sourceExists = await this.fs.exists(sourceCmake);
        return sourceExists;
    }
}
