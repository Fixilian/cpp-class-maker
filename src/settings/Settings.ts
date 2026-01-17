import * as vscode from 'vscode';
import { InvalidPropertyError } from '../errors';

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
     * @param property Configuration property id.
     * @returns The property value, or an empty string if not set.
     */
    protected getOrEmpty(property: string): string {
        return this.config.get<string>(property) ?? '';
    }

    /**
     * Retrieves a configuration property by its key and ensures it exists.
     *
     * @template T The expected type of the configuration value.
     * @param property Configuration property id.
     * @returns The value of the configuration property.
     * @throws {InvalidPropertyError} If the property is not found or its value is undefined/null.
     */
    protected getOrThrow<T>(property: string): T {
        const val = this.config.get<T>(property);
        if (val) {
            return val;
        }
        throw new InvalidPropertyError(property, 'Missing setting');
    }
}
