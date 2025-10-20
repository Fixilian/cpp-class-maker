import { isIdentifier } from '../../src/core';
import * as tester from '../testUtils/Tester';

suite("Identifier Test Suite", () => {

    test("isIdentifier", () => {
        const testCases: [string, boolean][] = [
            ["camelCase", true],
            ["PascalCase", true],
            ["snake_case", true],
            ["XMLRequest", true],
            ["XmlRequest", true],
            ["Vector2D", true],
            ["Render3DView", true],
            ["Int32Buffer", true],
            ["__init__", true],
            ["3dModel", false],
            ["hello world", false],
            ["hello-world", false],
            [".cpp", false],
            ["$cpp", false],
        ];
        tester.runTestCases(isIdentifier, testCases);
    });
});
