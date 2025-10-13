import * as assert from 'assert';

import * as path from 'path';
import * as vscode from 'vscode';
import { HstLocations } from '../../src/File/HstLocations';
import { WorkspaceStructure } from '../../src/Workspace/WorkspaceStructure';
import { Workspace } from '../../src/Workspace/Workspace';

suite("HstLocations Test Suite", () => {
    const includePath = 'include';
    const srcPath = 'src';
    const testPath = 'test';
    const includeInSrc = 'src/include';
    const structure = new WorkspaceStructure(includePath, srcPath, testPath);
    const workspacePath = path.join(process.cwd(), 'test_workspace', 'unit_tests');
    const workspaceUri = vscode.Uri.file(workspacePath);
    const workspace = new Workspace(workspaceUri, structure);

    test("destination is src dir", () => {
        const dirPath = path.join(workspacePath, srcPath);

        const locations = HstLocations.to(dirPath, workspace);
        
        assert.equal(locations.headerLoc, path.join(workspacePath, includePath));
        assert.equal(locations.sourceLoc, path.join(workspacePath, srcPath));
        assert.equal(locations.testLoc, path.join(workspacePath, testPath));
    });

    test("destination is src dir with tail", () => {
        const subDir = 'base';
        const dirPath = path.join(workspacePath, srcPath, subDir);
        
        const locations = HstLocations.to(dirPath, workspace);
        
        assert.equal(locations.headerLoc, path.join(workspacePath, includePath, subDir));
        assert.equal(locations.sourceLoc, path.join(workspacePath, srcPath, subDir));
        assert.equal(locations.testLoc, path.join(workspacePath, testPath, subDir));
    });

    test("destination is src dir when include dir is equal to src dir", () => {
        const structure = new WorkspaceStructure(srcPath, srcPath, testPath);
        const workspace = new Workspace(workspaceUri, structure);

        const subDir = 'base';
        const dirPath = path.join(workspacePath, srcPath, subDir);

        const locations = HstLocations.to(dirPath, workspace);
        
        assert.equal(locations.headerLoc, path.join(workspacePath, srcPath, subDir));
        assert.equal(locations.sourceLoc, path.join(workspacePath, srcPath, subDir));
        assert.equal(locations.testLoc, path.join(workspacePath, testPath, subDir));
    });

    test("destination is include dir", () => {
        const dirPath = path.join(workspacePath, includePath);

        const locations = HstLocations.to(dirPath, workspace);
        
        assert.equal(locations.headerLoc, path.join(workspacePath, includePath));
        assert.equal(locations.sourceLoc, path.join(workspacePath, srcPath));
        assert.equal(locations.testLoc, path.join(workspacePath, testPath));
    });

    test("destination is include dir with tail", () => {
        const subDir = 'base';
        const dirPath = path.join(workspacePath, includePath, subDir);
        
        const locations = HstLocations.to(dirPath, workspace);
        
        assert.equal(locations.headerLoc, path.join(workspacePath, includePath, subDir));
        assert.equal(locations.sourceLoc, path.join(workspacePath, srcPath, subDir));
        assert.equal(locations.testLoc, path.join(workspacePath, testPath, subDir));
    });

    test("destination is test dir", () => {
        const dirPath = path.join(workspacePath, testPath);
        
        const locations = HstLocations.to(dirPath, workspace);
        
        assert.equal(locations.headerLoc, dirPath);
        assert.equal(locations.sourceLoc, dirPath);
        assert.equal(locations.testLoc, dirPath);
    });

    test("destination is workspace dir", () => {
        const dirPath = workspacePath;
        
        const locations = HstLocations.to(dirPath, workspace);
        
        assert.equal(locations.headerLoc, dirPath);
        assert.equal(locations.sourceLoc, dirPath);
        assert.equal(locations.testLoc, dirPath);
    });

    test("destination is include dir when include dir is inside src dir", () => {
        const structure = new WorkspaceStructure(includeInSrc, srcPath, testPath);
        const workspace = new Workspace(workspaceUri, structure);

        const dirPath = path.join(workspacePath, includeInSrc);

        const locations = HstLocations.to(dirPath, workspace);
        
        assert.equal(locations.headerLoc, path.join(workspacePath, includeInSrc));
        assert.equal(locations.sourceLoc, path.join(workspacePath, srcPath));
        assert.equal(locations.testLoc, path.join(workspacePath, testPath));
    });

    test("destination is src dir when include dir is inside src dir", () => {
        const structure = new WorkspaceStructure(includeInSrc, srcPath, testPath);
        const workspace = new Workspace(workspaceUri, structure);

        const dirPath = path.join(workspacePath, srcPath);

        const locations = HstLocations.to(dirPath, workspace);
        
        assert.equal(locations.headerLoc, path.join(workspacePath, includeInSrc));
        assert.equal(locations.sourceLoc, path.join(workspacePath, srcPath));
        assert.equal(locations.testLoc, path.join(workspacePath, testPath));
    });
});
