import * as vscode from 'vscode';
import { FileSystem, ProjectLayout } from '../core';
import { SourceControlManager } from './SourceControlManager';
import { GitScm } from './GitScm';

/**
 * Creates the appropriate SourceControlManager instance based on the project workspace contents.
 * Scans the workspace and returns the corresponding SCM (e.g., GitScm).
 */
export class ScmFactory {
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

    async create(): Promise<SourceControlManager | undefined> {
        const hasGit = await this.hasGit();
        if (hasGit) {
            return new GitScm();
        }
        return undefined;
    }

    private async hasGit(): Promise<boolean> {
        const gitDir = vscode.Uri.joinPath(this.layout.root, '.git');
        const gitDirExits = await this.fs.exists(gitDir);
        return gitDirExits;
    }
}
