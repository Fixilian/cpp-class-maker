import * as assert from 'assert';

import * as vscode from 'vscode';
import * as path from 'path';
import { Workspace } from '../workspace';

suite("Workspace Test Suite", () => {
    const workspacePath = path.join(process.cwd(), 'test-workspace');
    const filepath = path.join(workspacePath, 'client', 'README.md');
    const uri = vscode.Uri.file(filepath);
    const workspaceName = 'client';

    test("workspace correctly identifies WorkspaceFolder", () => {
        const workspace = new Workspace(uri);
        const folder = workspace.folder;

        assert.equal(folder.name, workspaceName);
    });

    test("to uri conversion", () => {
        const workspace = new Workspace(uri);
        const file = path.join(workspacePath, 'client', 'main.cpp');
        const fileUri = workspace.toUri(file);
        const expectedUri = workspace.folder.uri.with({path: file});

        assert.equal(fileUri.path, file);
        assert.deepStrictEqual(fileUri, expectedUri);
    });

    test("workspace correctly detects existence of file", () => {
        const workspace = new Workspace(uri);
        const notExistingFile = 'client/NotExists.txt';
        const fileUri = workspace.toUri(notExistingFile);

        workspace.exists(fileUri).then((exists) => {
            assert.equal(exists, false);
        });
        workspace.exists(uri).then((exists) => {
            assert.equal(exists, true);
        });
    });
});
