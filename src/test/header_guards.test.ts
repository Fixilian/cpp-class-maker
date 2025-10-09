import * as headerGuards from '../header_guards';
import * as tester from './tester';

suite("Header guards Module Test Suite", () => {

    test("toScreamingSnakeCase", () => {
        const testCases: [string, string][] = [
            ["src/base", "SRC_BASE"],
            ["lib/core/utils", "LIB_CORE_UTILS"],
        ];
        tester.runTestCases(headerGuards.toScreamingSnakeCase, testCases);
    });

    test("toDoubleScreamingSnakeCase", () => {
        const testCases: [string, string][] = [
            ["src/base", "SRC__BASE"],
            ["lib/core/utils", "LIB__CORE__UTILS"],
        ];
        tester.runTestCases(headerGuards.toDoubleScreamingSnakeCase, testCases);
    });
});
