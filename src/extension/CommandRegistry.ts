import { FileTypes, LanguageId } from '../core';
import { Command } from './Command';
import { CommandFactory } from './CommandFactory';

/**
 * Registry of all commands provided by the extension.
 *
 * Maps command identifiers to their corresponding executable {@link Command} functions.
 */
export class CommandRegistry {

    /**
     * Map of command IDs to their implementations.
     */
    readonly commands: Map<string, Command>;

    /**
     * Initializes the command registry with all supported commands.
     */
    constructor() {
        const factory = new CommandFactory();
        this.commands = new Map([
            [
                'cppClassMaker.newClass',
                factory.create(LanguageId.Cpp, [FileTypes.Header, FileTypes.Source, FileTypes.Test]),
            ],
            [
                'cppClassMaker.newClassNoTest',
                factory.create(LanguageId.Cpp, [FileTypes.Header, FileTypes.Source]),
            ],
            [
                'cppClassMaker.newHeader',
                factory.create(LanguageId.Cpp, [FileTypes.Header]),
            ],
            [
                'cppClassMaker.newTemplateClass',
                factory.create(LanguageId.Cpp, [FileTypes.TemplateClassHeader, FileTypes.Test]),
            ],
            [
                'cppClassMaker.newTemplateClassNoTest',
                factory.create(LanguageId.Cpp, [FileTypes.TemplateClassHeader]),
            ],
            [
                'cppClassMaker.newCStruct',
                factory.create(LanguageId.C, [FileTypes.Header, FileTypes.Source, FileTypes.Test]),
            ],
            [
                'cppClassMaker.newCStructNoTest',
                factory.create(LanguageId.C, [FileTypes.Header, FileTypes.Source]),
            ],
            [
                'cppClassMaker.newCHeader',
                factory.create(LanguageId.C, [FileTypes.Header]),
            ],
        ]);
    }
}
