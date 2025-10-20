import * as vscode from 'vscode';
import { CSettings } from './CSettings';
import { CppSettings } from './CppSettings';
import { GeneralSettings } from './GeneralSettings';

/**
 * Manages extension settings for a given workspace folder.
 */
export class SettingsManager {
    /**
     * The VS Code workspace configuration for the extension.
     */
    private readonly config: vscode.WorkspaceConfiguration;

    /**
     * @param workspaceFolder The workspace folder whose configuration should be used.
     */
    constructor(workspaceFolder: vscode.WorkspaceFolder) {
        this.config = vscode.workspace.getConfiguration('cppClassMaker', workspaceFolder);
    }

    /**
     * Returns general extension settings.
     *
     * @returns General extension settings.
     */
    getGeneralSettings(): GeneralSettings {
        return new GeneralSettings(this.config);
    }

    /**
     * Returns the C language-specific settings.
     *
     * @returns The C-specific settings.
     */
    getCSettings(): CSettings {
        return new CSettings(this.config);
    }

    /**
     * Returns the C++ language-specific settings.
     *
     * @returns The C++-specific settings.
     */
    getCppSettings(): CppSettings {
        return new CppSettings(this.config);
    }
}
