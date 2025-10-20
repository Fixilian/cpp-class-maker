import * as vscode from 'vscode';

/**
 * Provides a base class for accessing workspace configuration settings.
 */
export abstract class Settings {
    /**
     * The VS Code workspace configuration.
     */
    protected readonly config: vscode.WorkspaceConfiguration;

    /**
     * @param config The VS Code workspace configuration.
     */
    constructor(config: vscode.WorkspaceConfiguration) {
        this.config = config;
    }

    /**
     * Returns the value of the specified configuration property, or an empty string if undefined.
     *
     * @param property The configuration property id.
     * @returns The property value, or an empty string if not set.
     */
    protected getOrEmpty(property: string): string {
        return this.config.get<string>(property) ?? '';
    }
}
