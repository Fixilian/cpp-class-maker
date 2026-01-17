import * as vscode from 'vscode';
import { SourceControlManager, ScmFactory } from '../scm';
import { BuildSystem, BuildSystemFactory } from '../buildSystem';
import { FileSystem, ProjectLayout } from '../core';
import { GeneralSettings } from '../settings';

/**
 * Represents a single workspace environment, managing its build system and source control.
 *
 * Handles initialization, updates, and cleanup of workspace-level components
 * based on user settings and project layout.
 */
export class WorkspaceContext implements vscode.Disposable {

    private buildSystem: BuildSystem | undefined;

    private scm: SourceControlManager | undefined;

    /**
     * @param buildSystem The active build system instance, if any.
     * @param scm The active source control manager, if any.
     */
    private constructor(buildSystem: BuildSystem | undefined, scm: SourceControlManager | undefined) {
        this.buildSystem = buildSystem;
        this.scm = scm;
    }

    /**
     * Creates a new {@link WorkspaceContext} instance using current file system, layout, and settings.
     *
     * @param fs File system abstraction.
     * @param layout Project layout paths.
     * @param settings General extension settings.
     * @returns A new initialized {@link WorkspaceContext}.
     */
    static async create(fs: FileSystem, layout: ProjectLayout, settings: GeneralSettings): Promise<WorkspaceContext> {
        let buildSystem: BuildSystem | undefined = undefined;
        if (settings.isAutoAddToBuildSystemAllowed()) {
            const buildSystemFactory = new BuildSystemFactory(fs, layout);
            buildSystem = await buildSystemFactory.create();
        }
        let scm: SourceControlManager | undefined = undefined;
        if (settings.isAutoAddToSourceControlManagerAllowed()) {
            const scmFactory = new ScmFactory(fs, layout);
            scm = await scmFactory.create();
        }
        return new WorkspaceContext(buildSystem, scm);
    }

    /**
     * Returns the active build system, if available.
     */
    getBuildSystem(): BuildSystem | undefined {
        return this.buildSystem;
    }

    /**
     * Returns the active source control manager, if available.
     */
    getScm(): SourceControlManager | undefined {
        return this.scm;
    }

    dispose(): any {
        this.scm?.dispose();
    }

    /**
     * Updates workspace components based on the latest settings.
     *
     * Initializes missing systems if automatic setup is allowed.
     *
     * @param fs File system abstraction.
     * @param layout Project layout paths.
     * @param settings General extension settings.
     */
    async update(fs: FileSystem, layout: ProjectLayout, settings: GeneralSettings): Promise<void> {
        if (settings.isAutoAddToBuildSystemAllowed() && !this.buildSystem) {
            const buildSystemFactory = new BuildSystemFactory(fs, layout);
            this.buildSystem = await buildSystemFactory.create();
        }
        if (settings.isAutoAddToSourceControlManagerAllowed() && !this.scm) {
            const scmFactory = new ScmFactory(fs, layout);
            this.scm = await scmFactory.create();
        }
    }
}
