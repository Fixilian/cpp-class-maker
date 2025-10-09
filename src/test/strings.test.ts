import * as strings from '../strings';
import * as tester from './tester';

suite("strings Module Test Suite", () => {

    test("isUpper", () => {
        const testCases: [string | undefined, boolean][] = [
            ["UPPER", true],
            ["U", true],
            ["Upper", false],
            ["upper", false],
            ["upper2", false],
            ["2upper", false],
            ["upper_case", false],
            ["upper case", false],
            ["upper-case", false],
            ["", false],
            [undefined, false],
        ];
        tester.runTestCases(strings.isUpper, testCases);
    });

    test("isLower", () => {
        const testCases: [string | undefined, boolean][] = [
            ["lower", true],
            ["l", true],
            ["LOWER", false],
            ["Lower", false],
            ["lower2", false],
            ["2lower", false],
            ["lower_case", false],
            ["lower case", false],
            ["lower-case", false],
            ["", false],
            [undefined, false],
        ];
        tester.runTestCases(strings.isLower, testCases);
    });

    test("isDigit", () => {
        const testCases: [string | undefined, boolean][] = [
            ["010101", true],
            ["2", true],
            ["DIGIT", false],
            ["Digit", false],
            ["digit", false],
            ["digit2", false],
            ["2digit", false],
            ["digit_2d", false],
            ["digit 2d", false],
            ["digit-2d", false],
            ["", false],
            [undefined, false],
        ];
        tester.runTestCases(strings.isDigit, testCases);
    });

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
        tester.runTestCases(strings.isAlpha, testCases);
    });

    test("capitalizeFirst", () => {
        const testCases: [string, string][] = [
            ["b", "B"],
            ["Y", "Y"],
            ["UPPER", "UPPER"],
            ["Word", "Word"],
            ["lower", "Lower"],
            ["0", "0"],
            ["123", "123"],
        ];
        tester.runTestCases(strings.capitalizeFirst, testCases);
    });

    test("lowercaseFirst", () => {
        const testCases: [string, string][] = [
            ["b", "b"],
            ["Y", "y"],
            ["UPPER", "uPPER"],
            ["Word", "word"],
            ["lower", "lower"],
            ["0", "0"],
            ["123", "123"],
        ];
        tester.runTestCases(strings.lowercaseFirst, testCases);
    });
});
