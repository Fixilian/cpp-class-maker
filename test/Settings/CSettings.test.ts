import * as assert from 'assert';
import * as asserts from '../TestUtility/Asserts';

import { CSettings } from '../../src/Settings/CSettings';
import { FileTypes } from '../../src/File/FileType';

suite("C Settings Test Suite", () => {

    test("All values are not empty", () => {
        const settings = new CSettings();

        assert.doesNotThrow(() => settings.getFileNameCase());
        
        const structure = settings.getWorkspaceStructure();
        asserts.notEmpty(structure.includeDir, "Workspace include dir");
        asserts.notEmpty(structure.sourceDir, "Workspace source dir");
        asserts.notEmpty(structure.testDir, "Workspace test dir");
        
        asserts.notEmpty(settings.getIncludeGuardTemplate(), "Include guard template");
        asserts.notEmpty(settings.getHeaderFileNameTemplate(), "Header file name template");
        asserts.notEmpty(settings.getSourceFileNameTemplate(), "Source file name template");
        asserts.notEmpty(settings.getTestFileNameTemplate(), "Test file name template");
        
        asserts.notEmpty(settings.getFileTemplate(FileTypes.Header), "Header file template");
        asserts.notEmpty(settings.getFileTemplate(FileTypes.Source), "Source file template");
        asserts.notEmpty(settings.getFileTemplate(FileTypes.EmptyHeader), "Empty header file template");
        asserts.notEmpty(settings.getFileTemplate(FileTypes.Test), "Test file template");
        assert.throws(() => settings.getFileTemplate(FileTypes.TemplateClassHeader));

        const constants = settings.getConstants();
        asserts.notEmpty(constants.get('H'), 'Header file extension');
        asserts.notEmpty(constants.get('C'), 'Source file extension');
    });
});
