import { Settings } from "../Settings/Settings";
import { File } from "../File/File";
import { FileType, FileTypes } from "../Types/FileType";
import { Workspace } from "../Workspace/Workspace";
import { HstLocations } from "./HstLocations";
import { TemplateProcessor } from "./TemplateProcessor";
import { Identifier } from "../Identifier/Identifier";
import * as path from 'path';
import * as identifiers from "../Identifier/Identifiers";
import * as incGuards from "../File/IncludeGuards";

/**
 * FileFactory creates files of type FIleType.
 */
export class FileFactory {
    /** Processor for file name and content. */
    private templateProcessor: TemplateProcessor;

    /** File locations. */
    private locations: HstLocations;

    /** Current settings. */
    private settings: Settings;

    /** Current workspace. */
    private workspace: Workspace;

    /**
     * @param name entity name (i.e. class or struct name, or file name).
     * @param dirPath user-selected directory.
     * @param workspace current workspace.
     * @param settings current settings.
     */
    constructor(name: Identifier, dirPath: string, workspace: Workspace, settings: Settings) {
        this.locations = HstLocations.to(dirPath, workspace);
        this.settings = settings;
        this.workspace = workspace;
        const constants = this.generateConstants(name);
        this.templateProcessor = new TemplateProcessor(constants);
    }

    /**
     * Generates constants.
     * 
     * @param identifier entity name (i.e. class or struct name, or file name).
     */
    private generateConstants(identifier: Identifier): Map<string, string> {
        const settingsRelatedConstants = this.settings.getConstants();
        const constants = new Map<string, string>();
        settingsRelatedConstants.forEach((value, key) => {
            constants.set(key, value);
        });

        constants.set('NAME', identifier.name);
        constants.set('NAME_CAMEL', identifiers.toCamelCase(identifier));
        constants.set('NAME_PASCAL', identifiers.toPascalCase(identifier));
        constants.set('NAME_SNAKE', identifiers.toSnakeCase(identifier));
        constants.set('NAME_SCREAM', identifiers.toScreamingSnakeCase(identifier));
        
        const fileNameCase = this.settings.getFileNameCase();
        constants.set('FILE_NAME', identifiers.convertCase(identifier, fileNameCase));

        const workspacePath = this.workspace.folder.uri.path;
        const includeDir = path.join(workspacePath, this.workspace.structure.includeDir);
        const headerDir = path.relative(includeDir, this.locations.headerLoc);
        constants.set('PATH', incGuards.toScreamingSnakeCase(headerDir));
        constants.set('PATH_WIDE', incGuards.toDoubleScreamingSnakeCase(headerDir));

        const processor = new TemplateProcessor(constants);
        const headerNameTemplate = this.settings.getHeaderFileNameTemplate();
        const headerName = processor.process(headerNameTemplate);
        constants.set('HEADER', headerName);
        constants.set('HEADER_PATH', path.join(headerDir, headerName));
        
        const includeGuardTemplate = this.settings.getIncludeGuardTemplate();
        const includeGuard = processor.process(includeGuardTemplate);
        constants.set('INCLUDE_GUARD', includeGuard);

        return constants;
    }

    /**
     * Creates file of the specified type according to the template from the settings.
     * 
     * @param type file type. 
     * @returns file of the specified type.
     */
    create(type: FileType): File {
        const nameTemplate = this.getFileNameTemplate(type);
        const fileName = this.templateProcessor.process(nameTemplate);
        const location = this.getFileLocation(type);
        const filePath = path.join(location, fileName);
        const fileUri = this.workspace.toUri(filePath);

        const contentTemplate = this.settings.getFileTemplate(type);
        const content = this.templateProcessor.process(contentTemplate);

        return new File(fileUri, type, content);
    }

    /**
     * Returns file name template for the specified type.
     * 
     * @param type file type. 
     */
    private getFileNameTemplate(type: FileType): string {
        switch (type) {
        case FileTypes.Source: return this.settings.getSourceFileNameTemplate();
        case FileTypes.Test: return this.settings.getTestFileNameTemplate();
        case FileTypes.Header: // fall through 
        case FileTypes.EmptyHeader: // fall through 
        case FileTypes.TemplateClassHeader: return this.settings.getHeaderFileNameTemplate();
        default: throw new Error(`Unknown file type ${type}`);
        }
    }

    /**
     * Returns file location for the specified type.
     * 
     * @param type file type. 
     */
    private getFileLocation(type: FileType): string {
        switch (type) {
        case FileTypes.Source: return this.locations.sourceLoc;
        case FileTypes.Test: return this.locations.testLoc;
        case FileTypes.Header: // fall through 
        case FileTypes.EmptyHeader: // fall through 
        case FileTypes.TemplateClassHeader: return this.locations.headerLoc;
        default: throw new Error(`Unknown file type ${type}`);
        }
    }
}
