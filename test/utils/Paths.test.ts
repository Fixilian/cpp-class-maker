import * as assert from 'assert';
import * as paths from '../../src/utils/Paths';
import * as tester from '../testUtils/Tester';

suite("Paths Module Test Suite", () => {

    test("isSubDirectory", () => {
        assert.equal(paths.isSubDirectory('workspace', 'workspace/src'), true);
        assert.equal(paths.isSubDirectory('workspace', 'workspace/src/base'), true);
        assert.equal(paths.isSubDirectory('workspace', 'workspace'), true);
        assert.equal(paths.isSubDirectory('workspace', 'src'), false);
    });

    test("toScreamingSnakeCase", () => {
        const testCases: [string, string][] = [
            ["src/base", "SRC_BASE"],
            ["lib/core/utils", "LIB_CORE_UTILS"],
        ];
        tester.runTestCases(paths.toScreamingSnakeCase, testCases);
    });

    test("toDoubleScreamingSnakeCase", () => {
        const testCases: [string, string][] = [
            ["src/base", "SRC__BASE"],
            ["lib/core/utils", "LIB__CORE__UTILS"],
        ];
        tester.runTestCases(paths.toDoubleScreamingSnakeCase, testCases);
    });
});
