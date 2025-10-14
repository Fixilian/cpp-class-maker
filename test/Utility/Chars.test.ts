import * as assert from 'assert';
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

    test("isWhitespace", () => {
        const testCases: [string, boolean][] = [
            [" ", true],
            ["\n", true],
            ["\r", true],
            ["\t", true],
            ["B", false],
            ["Y", false],
            ["b", false],
            ["y", false],
            ["0", false],
            ["1", false],
            ["8", false],
            ["_", false],
            ["-", false],
            ["", false],
        ];
        tester.runTestCases(chars.isWhitespace, testCases);
    });

    test("isUpperLetter", () => {
        const begin = 'A'.charCodeAt(0);
        const end = 'Z'.charCodeAt(0);
        testCharRange(begin, end, chars.isUpperLetter);
    });

    test("isLowerLetter", () => {
        const begin = 'a'.charCodeAt(0);
        const end = 'z'.charCodeAt(0);
        testCharRange(begin, end, chars.isLowerLetter);
    });

    test("isDigit", () => {
        const begin = '0'.charCodeAt(0);
        const end = '9'.charCodeAt(0);
        testCharRange(begin, end, chars.isDigit);
    });
});

function testCharRange(begin: number, end: number, func: (ch: number) => boolean) {
    for (let i = 0; i < begin; i += 1) {
        assert.equal(func(i), false);
    }
    for (let i = begin; i <= end; i += 1) {
        assert.equal(func(i), true);
    }
    for (let i = end + 1; i < 128; i += 1) {
        assert.equal(func(i), false);
    }
}
