import * as vscode from 'vscode';
import { FileType, FileTypes, IdentifierCase } from '../core';
import { LanguageSettings } from './LanguageSettings';
import { UnknownEnumValueError } from '../errors';

/**
 * Represents C language-specific settings.
 */
export class CSettings extends LanguageSettings {
    /**
     * @param config The VS Code workspace configuration.
     */
    constructor(config: vscode.WorkspaceConfiguration) {
        super(config);
    }

    getFileNameCase(): IdentifierCase {
        return this.getIdentifierCase('c.fileNameCase');
    }

    getIncludeDirectoryPath(): string {
        return this.getOrEmpty('c.includeDirectoryPath');
    }

    getSourceDirectoryPath(): string {
        return this.getOrEmpty('c.sourceDirectoryPath');
    }

    getTestDirectoryPath(): string {
        return this.getOrEmpty('c.testDirectoryPath');
    }

    getIncludeGuardTemplate(): string {
        return this.getOrEmpty('c.templates.includeGuard');
    }

    getHeaderFileNameTemplate(): string {
        return this.getOrEmpty('c.templates.headerFileName');
    }

    getSourceFileNameTemplate(): string {
        return this.getOrEmpty('c.templates.sourceFileName');
    }

    getTestFileNameTemplate(): string {
        return this.getOrEmpty('c.templates.testFileName');
    }

    getFileTemplate(fileType: FileType): string {
        switch (fileType) {
        case FileTypes.Header: return this.getOrEmpty('c.templates.structHeaderFile');
        case FileTypes.Source: return this.getOrEmpty('c.templates.structSourceFile');
        case FileTypes.EmptyHeader: return this.getOrEmpty('c.templates.emptyHeaderFile');
        case FileTypes.Test: return this.getOrEmpty('c.templates.structTestFile');
        default: throw new UnknownEnumValueError('FileTypes', fileType);
        }
    }

    getConstants(): Map<string, string> {
        let constants = new Map<string, string>();
        constants.set('H', this.getOrEmpty('c.headerFileExtension'));
        constants.set('C', this.getOrEmpty('c.sourceFileExtension'));
        return constants;
    }
}
