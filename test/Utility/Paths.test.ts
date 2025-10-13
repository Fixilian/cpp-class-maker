import * as assert from 'assert';
import * as paths from '../../src/Utility/Paths';
import * as path from 'path';
import * as vscode from 'vscode';

suite("Paths Module Test Suite", () => {

    test("isSubDirectory", () => {
        assert.equal(paths.isSubDirectory('workspace', 'workspace/src'), true);
        assert.equal(paths.isSubDirectory('workspace', 'workspace/src/base'), true);
        assert.equal(paths.isSubDirectory('workspace', 'workspace'), true);
        assert.equal(paths.isSubDirectory('workspace', 'src'), false);
    });

    test("", () => {
        const workspaceName = 'test_workspace';
        const workspacePath = path.join(process.cwd(), workspaceName);
        const dirPath = path.join(workspacePath, 'unit_tests', 'template_tests');
        const uri = vscode.Uri.file(dirPath);
        const subDirCount = 3;
        let counter = 0;

        paths.visitDirsUp(uri, (current) => {
            const isSub = paths.isSubDirectory(workspacePath, current.path);
            if (isSub) {
                counter += 1;
            }
            return isSub;
        });

        assert.equal(counter, subDirCount);
    });
});
