import * as vscode from 'vscode';
import { CSettings } from './CSettings';
import { CppSettings } from './CppSettings';
import { GeneralSettings } from './GeneralSettings';
import { LanguageId, LanguageIdType } from '../core/LanguageId';
import { LanguageSettings } from './LanguageSettings';

/**
 * Manages extension settings for a given workspace folder.
 */
export class SettingsManager {
    /**
     * The VS Code workspace configuration for the extension.
     */
    private readonly config: vscode.WorkspaceConfiguration;

    /**
     * General extension settings for the workspace.
     */
    private readonly generalSettings: GeneralSettings;

    /**
     * Language-specific settings for the workspace.
     */
    private readonly languageSettings: LanguageSettings;

    /**
     * @param language Language id for language-specific settings.
     * @param workspaceFolder The workspace folder whose configuration should be used.
     */
    constructor(language: LanguageIdType, workspaceFolder: vscode.WorkspaceFolder) {
        this.config = vscode.workspace.getConfiguration('cppClassMaker', workspaceFolder);
        this.generalSettings = new GeneralSettings(this.config);
        switch (language) {
        case LanguageId.C: this.languageSettings = new CSettings(this.config); break;
        case LanguageId.Cpp: this.languageSettings = new CppSettings(this.config); break;
        default: throw new Error(`Unknown language id ${language}`);
        }
    }

    /**
     * Returns general extension settings.
     *
     * @returns General extension settings.
     */
    getGeneralSettings(): GeneralSettings {
        return this.generalSettings;
    }

    /**
     * Returns language-specific settings.
     *
     * @returns language-specific settings.
     */
    getLanguageSettings(): LanguageSettings {
        return this.languageSettings;
    }
}
