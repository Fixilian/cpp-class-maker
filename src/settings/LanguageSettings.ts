import * as vscode from 'vscode';
import { FileType, IdentifierCase, fromString } from '../core';
import { Settings } from './Settings';
import { InvalidPropertyError } from '../errors';

/**
 * Defines the base class for all language-specific settings.
 *
 * Provides accessors for file naming, directory paths, templates, and constants
 * based on the current workspace configuration.
 */
export abstract class LanguageSettings extends Settings {
    /**
     * @param config The VS Code workspace configuration.
     */
    constructor(config: vscode.WorkspaceConfiguration) {
        super(config);
    }

    /**
     * Returns the naming case used for generated file names.
     *
     * @returns The file name case.
     * @throws `Error` if the case name is invalid or missing.
     */
    abstract getFileNameCase(): IdentifierCase;

    /**
     * Returns the relative path to the include directory.
     *
     * @returns Include directory path.
     */
    abstract getIncludeDirectoryPath(): string;

    /**
     * Returns the relative path to the source directory.
     *
     * @returns Source directory path.
     */
    abstract getSourceDirectoryPath(): string;

    /**
     * Returns the relative path to the test directory.
     *
     * @returns Test directory path.
     */
    abstract getTestDirectoryPath(): string;

    /**
     * Returns the template used to generate include guards.
     *
     * @returns Include guard template.
     */
    abstract getIncludeGuardTemplate(): string;

    /**
     * Returns the template for naming header files.
     *
     * @returns Header file name template.
     */
    abstract getHeaderFileNameTemplate(): string;

    /**
     * Returns the template for naming source files.
     *
     * @returns Source file name template.
     */
    abstract getSourceFileNameTemplate(): string;

    /**
     * Returns the template for naming test files.
     *
     * @returns Test file name template.
     */
    abstract getTestFileNameTemplate(): string;

    /**
     * Returns the template used to generate file content.
     *
     * @param fileType The type of the file to generate.
     * @returns File content template.
     * @throws `Error` if the file type is not supported.
     */
    abstract getFileTemplate(fileType: FileType): string;

    /**
     * Returns a map of settings-dependent constants that can be used
     * during template expansion.
     *
     * @returns A map of constants.
     */
    abstract getConstants(): Map<string, string>;

    /**
     * Returns the identifier case from the configuration.
     *
     * @param property The property id.
     * @returns Casing style corresponding to the config value.
     * @throws {InvalidPropertyError} if the property is missing or invalid.
     */
    protected getIdentifierCase(property: string): IdentifierCase {
        const value = this.config.get<string>(property);
        if (!value) {
            throw new InvalidPropertyError(property, 'Value is not represents identifier case');
        }
        return fromString(value);
    }
}
