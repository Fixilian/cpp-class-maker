import assert from 'node:assert';
import * as paths from '../../src/Utility/Paths';

suite("Paths Module Test Suite", () => {

    test("isSubDirectory", () => {
        assert.equal(paths.isSubDirectory('workspace', 'workspace/src'), true);
        assert.equal(paths.isSubDirectory('workspace', 'workspace/src/base'), true);
        assert.equal(paths.isSubDirectory('workspace', 'workspace'), true);
        assert.equal(paths.isSubDirectory('workspace', 'src'), false);
    });
});
