import { isIdentifier } from '../../src/Identifier/Identifier';
import * as tester from '../TestUtility/Tester';

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
