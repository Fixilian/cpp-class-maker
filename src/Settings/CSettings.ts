import { FileType, FileTypes } from "../File/FileType";
import { Case } from "../Identifier/Case";
import { WorkspaceStructure } from "../Workspace/WorkspaceStructure";
import { Settings } from "./Settings";

/**
 * CSettings represents C-related settings.
 */
export class CSettings extends Settings {
    constructor() {
        super();
    }

    getFileNameCase(): Case {
        return this.getCase('c.fileNameCase');
    }

    getWorkspaceStructure(): WorkspaceStructure {
        return new WorkspaceStructure(
            this.getOrEmpty('c.includeDirectoryPath'),
            this.getOrEmpty('c.sourceDirectoryPath'),
            this.getOrEmpty('c.testDirectoryPath'),
        );
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
        default: throw new Error(`Unsupported C file type: ${fileType}`);
        }
    }

    getConstants(): Map<string, string> {
        let constants = new Map<string, string>();
        constants.set('H', this.getOrEmpty('c.headerFileExtension'));
        constants.set('C', this.getOrEmpty('c.sourceFileExtension'));
        return constants;
    }
}
