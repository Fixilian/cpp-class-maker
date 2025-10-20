import { LanguageSettings } from '../settings';
import { File, FileType, FileTypes, Identifier, ProjectLayout } from '../core';
import { HstLocations } from './HstLocations';
import { TemplateProcessor } from './TemplateProcessor';
import * as path from 'path';
import * as paths from '../utils/Paths';

/**
 * Creates files of type FileType.
 */
export class FileFactory {
    /**
     * The processor for file name and content.
     */
    private templateProcessor: TemplateProcessor;

    /**
     * File locations.
     */
    private locations: HstLocations;

    /**
     * Language-specific settings.
     */
    private settings: LanguageSettings;

    /**
     * The project layout.
     */
    private layout: ProjectLayout;

    /**
     * @param name The entity name (i.e. class or struct name, or file name).
     * @param dirPath User-selected directory.
     * @param layout The project layout.
     * @param settings Language-specific settings.
     */
    constructor(name: Identifier, dirPath: string, layout: ProjectLayout, settings: LanguageSettings) {
        this.locations = HstLocations.to(dirPath, layout);
        this.settings = settings;
        this.layout = layout;
        const constants = this.generateConstants(name);
        this.templateProcessor = new TemplateProcessor(constants);
    }

    /**
     * Generates constants.
     *
     * @param identifier The entity name (i.e. class or struct name, or file name).
     */
    private generateConstants(identifier: Identifier): Map<string, string> {
        const settingsRelatedConstants = this.settings.getConstants();
        const constants = new Map<string, string>();
        settingsRelatedConstants.forEach((value, key) => {
            constants.set(key, value);
        });

        constants.set('NAME', identifier.name);
        constants.set('NAME_CAMEL', identifier.toCamelCase());
        constants.set('NAME_PASCAL', identifier.toPascalCase());
        constants.set('NAME_SNAKE', identifier.toSnakeCase());
        constants.set('NAME_SCREAM', identifier.toScreamingSnakeCase());

        const fileNameCase = this.settings.getFileNameCase();
        constants.set('FILE_NAME', identifier.convertCase(fileNameCase));

        const rootPath = this.layout.root.path;
        const includeDir = path.join(rootPath, this.layout.includeDir);
        const headerDir = path.relative(includeDir, this.locations.headerLoc);
        constants.set('PATH', paths.toScreamingSnakeCase(headerDir));
        constants.set('PATH_WIDE', paths.toDoubleScreamingSnakeCase(headerDir));

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
     * @param type The file type.
     * @returns The file of the specified type.
     */
    create(type: FileType): File {
        const nameTemplate = this.getFileNameTemplate(type);
        const fileName = this.templateProcessor.process(nameTemplate);
        const location = this.getFileLocation(type);
        const filePath = path.join(location, fileName);
        const uri = this.layout.root.with({path: filePath});

        const contentTemplate = this.settings.getFileTemplate(type);
        const content = this.templateProcessor.process(contentTemplate);

        return { uri, type, content };
    }

    /**
     * Returns file name template for the specified type.
     *
     * @param type The file type.
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
     * @param type The file type.
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
