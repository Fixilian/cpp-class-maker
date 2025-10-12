import * as vscode from 'vscode';
import { FileType } from '../File/FileType';
import { WorkspaceStructure } from '../Workspace/WorkspaceStructure';
import { Case, fromString } from '../Identifier/Case';

/**
 * Settings is base class for any settings.
 */
export abstract class Settings {
    /** VS Code workspace configuration. */
    protected config: vscode.WorkspaceConfiguration;

    constructor() {
        this.config = vscode.workspace.getConfiguration('cppClassMaker');
    }

    /** 
     * Returns file name case.
     * 
     * @throws Error if case name is invalid.
     */
    abstract getFileNameCase(): Case;

    /**
     * Returns workspace structure.
     */
    abstract getWorkspaceStructure(): WorkspaceStructure;

    /**
     * Returns template for include guard.
     */
    abstract getIncludeGuardTemplate(): string;

    /**
     * Returns template for header file name.
     */
    abstract getHeaderFileNameTemplate(): string;
 
    /**
     * Returns template for source file name.
     */
    abstract getSourceFileNameTemplate(): string;
 
    /**
     * Returns template for test file name.
     */
    abstract getTestFileNameTemplate(): string;

    /**
     * Returns template for file content.
     * 
     * @param fileType file type.
     * @throws Error if file type is unsupported.
     */
    abstract getFileTemplate(fileType: FileType): string;

    /**
     * Returns a dictionary of settings-dependent constants.
     */
    abstract getConstants(): Map<string, string>;

    /**
     * Returns value of the property or the specified default value.
     * 
     * If property is undefined returns default value.
     * 
     * @param property property id.
     * @param def default value.
     */
    protected getOrDefault(property: string, def: string): string {
        return this.config.get<string>(property) ?? def;
    }

    /**
     * Returns value of the property or empty string.
     * 
     * @param property property id.
     */
    protected getOrEmpty(property: string): string {
        return this.getOrDefault(property, '');
    }

    /** 
     * Returns value of the case enum property.
     * 
     * @param property property id.
     * @throws Error if case name is invalid.
     */
    protected getCase(property: string): Case {
        const value = this.config.get<string>(property);
        if (!value) {
            throw new Error(`Missing setting: ${property}`);
        }
        return fromString(value); 
    }
}
