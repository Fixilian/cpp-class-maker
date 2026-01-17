import * as assert from 'assert';

import * as path from 'path';
import * as vscode from 'vscode';
import { HstLocations } from '../../src/fileFactory/HstLocations';

suite("HstLocations Test Suite", () => {
    const includeDir = 'include';
    const sourceDir = 'src';
    const testDir = 'test';
    const includeInSrc = 'src/include';
    const rootPath = path.join(process.cwd(), 'test_workspace', 'unit_tests');
    const root = vscode.Uri.file(rootPath);
    const layout = { root, includeDir, sourceDir, testDir};

    test("destination is src dir", () => {
        const dirPath = path.join(rootPath, sourceDir);

        const locations = HstLocations.to(dirPath, layout);

        assert.equal(locations.headerLoc, path.join(rootPath, includeDir));
        assert.equal(locations.sourceLoc, path.join(rootPath, sourceDir));
        assert.equal(locations.testLoc, path.join(rootPath, testDir));
    });

    test("destination is src dir with tail", () => {
        const subDir = 'base';
        const dirPath = path.join(rootPath, sourceDir, subDir);

        const locations = HstLocations.to(dirPath, layout);

        assert.equal(locations.headerLoc, path.join(rootPath, includeDir, subDir));
        assert.equal(locations.sourceLoc, path.join(rootPath, sourceDir, subDir));
        assert.equal(locations.testLoc, path.join(rootPath, testDir, subDir));
    });

    test("destination is src dir when include dir is equal to src dir", () => {
        const includeDir = sourceDir;
        const layout = { root, includeDir, sourceDir, testDir};

        const subDir = 'base';
        const dirPath = path.join(rootPath, sourceDir, subDir);

        const locations = HstLocations.to(dirPath, layout);

        assert.equal(locations.headerLoc, path.join(rootPath, includeDir, subDir));
        assert.equal(locations.sourceLoc, path.join(rootPath, sourceDir, subDir));
        assert.equal(locations.testLoc, path.join(rootPath, testDir, subDir));
    });

    test("destination is include dir", () => {
        const dirPath = path.join(rootPath, includeDir);

        const locations = HstLocations.to(dirPath, layout);

        assert.equal(locations.headerLoc, path.join(rootPath, includeDir));
        assert.equal(locations.sourceLoc, path.join(rootPath, sourceDir));
        assert.equal(locations.testLoc, path.join(rootPath, testDir));
    });

    test("destination is include dir with tail", () => {
        const subDir = 'base';
        const dirPath = path.join(rootPath, includeDir, subDir);

        const locations = HstLocations.to(dirPath, layout);

        assert.equal(locations.headerLoc, path.join(rootPath, includeDir, subDir));
        assert.equal(locations.sourceLoc, path.join(rootPath, sourceDir, subDir));
        assert.equal(locations.testLoc, path.join(rootPath, testDir, subDir));
    });

    test("destination is test dir", () => {
        const dirPath = path.join(rootPath, testDir);

        const locations = HstLocations.to(dirPath, layout);

        assert.equal(locations.headerLoc, dirPath);
        assert.equal(locations.sourceLoc, dirPath);
        assert.equal(locations.testLoc, dirPath);
    });

    test("destination is workspace dir", () => {
        const dirPath = rootPath;

        const locations = HstLocations.to(dirPath, layout);

        assert.equal(locations.headerLoc, dirPath);
        assert.equal(locations.sourceLoc, dirPath);
        assert.equal(locations.testLoc, dirPath);
    });

    test("destination is include dir when include dir is inside src dir", () => {
        const includeDir = includeInSrc;
        const layout = { root, includeDir, sourceDir, testDir};

        const dirPath = path.join(rootPath, includeDir);

        const locations = HstLocations.to(dirPath, layout);

        assert.equal(locations.headerLoc, path.join(rootPath, includeDir));
        assert.equal(locations.sourceLoc, path.join(rootPath, sourceDir));
        assert.equal(locations.testLoc, path.join(rootPath, testDir));
    });

    test("destination is src dir when include dir is inside src dir", () => {
        const includeDir = includeInSrc;
        const layout = { root, includeDir, sourceDir, testDir};

        const dirPath = path.join(rootPath, sourceDir);

        const locations = HstLocations.to(dirPath, layout);

        assert.equal(locations.headerLoc, path.join(rootPath, includeDir));
        assert.equal(locations.sourceLoc, path.join(rootPath, sourceDir));
        assert.equal(locations.testLoc, path.join(rootPath, testDir));
    });
});
