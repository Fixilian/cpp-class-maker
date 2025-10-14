import * as chars from '../../src/Utility/Chars';
import * as tester from '../TestUtility/Tester';

suite("Chars Module Test Suite", () => {

    test("isAlpha", () => {
        const testCases: [string, boolean][] = [
            ["B", true],
            ["Y", true],
            ["b", true],
            ["y", true],
            ["0", false],
            ["1", false],
            ["8", false],
            ["_", false],
            [" ", false],
            ["-", false],
            ["", false],
        ];
        tester.runTestCases(chars.isAlpha, testCases);
    });
});
