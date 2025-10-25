import * as vscode from 'vscode';
import { FileType, FileTypes, IdentifierCase } from '../core';
import { LanguageSettings } from './LanguageSettings';
import { UnknownEnumValueError } from '../errors';

/**
 * Represents C++ language-specific settings.
 */
export class CppSettings extends LanguageSettings {
    /**
     * @param config The VS Code workspace configuration.
     */
    constructor(config: vscode.WorkspaceConfiguration) {
        super(config);
    }

    getFileNameCase(): IdentifierCase {
        return this.getIdentifierCase('cpp.fileNameCase');
    }

    getIncludeDirectoryPath(): string {
        return this.getOrEmpty('cpp.includeDirectoryPath');
    }

    getSourceDirectoryPath(): string {
        return this.getOrEmpty('cpp.sourceDirectoryPath');
    }

    getTestDirectoryPath(): string {
        return this.getOrEmpty('cpp.testDirectoryPath');
    }

    getIncludeGuardTemplate(): string {
        return this.getOrEmpty('cpp.templates.includeGuard');
    }

    getHeaderFileNameTemplate(): string {
        return this.getOrEmpty('cpp.templates.headerFileName');
    }

    getSourceFileNameTemplate(): string {
        return this.getOrEmpty('cpp.templates.sourceFileName');
    }

    getTestFileNameTemplate(): string {
        return this.getOrEmpty('cpp.templates.testFileName');
    }

    getFileTemplate(fileType: FileType): string {
        switch (fileType) {
        case FileTypes.Header: return this.getOrEmpty('cpp.templates.classHeaderFile');
        case FileTypes.Source: return this.getOrEmpty('cpp.templates.classSourceFile');
        case FileTypes.EmptyHeader: return this.getOrEmpty('cpp.templates.emptyHeaderFile');
        case FileTypes.Test: return this.getOrEmpty('cpp.templates.classTestFile');
        case FileTypes.TemplateClassHeader:
            return this.getOrEmpty('cpp.templates.templateClassHeaderFile');
        default: throw new UnknownEnumValueError('FileTypes', fileType);
        }
    }

    getConstants(): Map<string, string> {
        let constants = new Map<string, string>();
        constants.set('HPP', this.getOrEmpty('cpp.headerFileExtension'));
        constants.set('CPP', this.getOrEmpty('cpp.sourceFileExtension'));
        constants.set('NAMESPACE', this.getOrEmpty('cpp.namespace'));
        return constants;
    }
}
