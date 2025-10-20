import * as vscode from 'vscode';
import { Settings } from './Settings';

/**
 * Represents general extension settings.
 */
export class GeneralSettings extends Settings {
    /**
     * @param config The VS Code workspace configuration.
     */
    constructor(config: vscode.WorkspaceConfiguration) {
        super(config);
    }

    /**
     * Checks if automatically adding files to the build system is allowed.
     *
     * @returns `true` if automatic addition to the build system is enabled.
     */
    isAutoAddToBuildSystemAllowed(): boolean {
        return this.getOrThrow('main.AutoAddToBuildSystem');
    }

    /**
     * Checks if automatically adding files to the Source Control Manager (SCM) is allowed.
     *
     * @returns `true` if automatic addition to the SCM is enabled.
     */
    isAutoAddToSourceControlManagerAllowed(): boolean {
        return this.getOrThrow('main.AutoAddToSourceControlManager');
    }
}
