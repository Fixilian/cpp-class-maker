import * as assert from 'assert';
import * as paths from '../../src/utils/Paths';
import * as path from 'path';
import * as vscode from 'vscode';
import { VscodeFileSystem } from '../../src/core';

suite("VS code file system Test Suite", () => {
    const fs = new VscodeFileSystem();

    test("exists", () => {
        const workspacePath = path.join(process.cwd(), 'test_workspace');

        const filepath = path.join(workspacePath, 'unit_tests', 'README.md');
        const uri = vscode.Uri.file(filepath);

        const notExistsfilePath = path.join(workspacePath, 'unit_tests', 'NotExists.txt');
        const notExistsfileUri = vscode.Uri.file(notExistsfilePath);

        fs.exists(notExistsfileUri).then((exists) => {
            assert.equal(exists, false);
        });
        fs.exists(uri).then((exists) => {
            assert.equal(exists, true);
        });
    });

    test("visitDirsUpSync", async () => {
        const workspaceName = 'test_workspace';
        const workspacePath = path.join(process.cwd(), workspaceName);
        const dirPath = path.join(workspacePath, 'unit_tests', 'template_tests');
        const uri = vscode.Uri.file(dirPath);
        const subDirCount = 3;
        let counter = 0;

        await fs.visitDirsUp(uri, (current: vscode.Uri) => {
            const isSub = paths.isSubDirectory(workspacePath, current.path);
            if (isSub) {
                counter += 1;
            }
            return isSub;
        });

        assert.equal(counter, subDirCount);
    });
});
