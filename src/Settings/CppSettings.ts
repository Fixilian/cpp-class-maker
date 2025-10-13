import { FileType, FileTypes } from "../Types/FileType";
import { Case } from "../Types/Case";
import { WorkspaceStructure } from "../Workspace/WorkspaceStructure";
import { Settings } from "./Settings";

/**
 * CppSettings represents C++ related settings.
 */
export class CppSettings extends Settings {
    constructor() {
        super();
    }

    getFileNameCase(): Case {
        return this.getCase('cpp.fileNameCase');
    }

    getWorkspaceStructure(): WorkspaceStructure {
        return new WorkspaceStructure(
            this.getOrEmpty('cpp.includeDirectoryPath'),
            this.getOrEmpty('cpp.sourceDirectoryPath'),
            this.getOrEmpty('cpp.testDirectoryPath'),
        );
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
        default: throw new Error(`Unsupported Cpp file type: ${fileType}`);
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
