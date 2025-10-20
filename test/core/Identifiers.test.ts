import * as identifiers from '../../src/core/Identifiers';
import * as tester from '../testUtils/Tester';

suite("Identifiers Module Test Suite", () => {

    test("toCamelCase", () => {
        const testCases: [string, string][] = [
            ["camelCase", "camelCase"],
            ["PascalCase", "pascalCase"],
            ["snake_case", "snakeCase"],
            ["XMLRequest", "xmlRequest"],
            ["XmlRequest", "xmlRequest"],
            ["Vector2D", "vector2D"],
            ["Render3DView", "render3DView"],
            ["Int32Buffer", "int32Buffer"],
        ];
        tester.runTestCases(identifiers.toCamelCase, testCases);
    });

    test("toPascalCase", () => {
        const testCases: [string, string][] = [
            ["camelCase", "CamelCase"],
            ["PascalCase", "PascalCase"],
            ["snake_case", "SnakeCase"],
            ["XMLRequest", "XMLRequest"],
            ["XmlRequest", "XmlRequest"],
            ["Vector2D", "Vector2D"],
            ["Render3DView", "Render3DView"],
            ["Int32Buffer", "Int32Buffer"],
        ];
        tester.runTestCases(identifiers.toPascalCase, testCases);
    });

    test("toSnakeCase", () => {
        const testCases: [string, string][] = [
            ["camelCase", "camel_case"],
            ["PascalCase", "pascal_case"],
            ["snake_case", "snake_case"],
            ["XMLRequest", "xml_request"],
            ["XmlRequest", "xml_request"],
            ["Vector2D", "vector_2d"],
            ["Render3DView", "render_3d_view"],
            ["Int32Buffer", "int32_buffer"],
        ];
        tester.runTestCases(identifiers.toSnakeCase, testCases);
    });

    test("toScreamingSnakeCase", () => {
        const testCases: [string, string][] = [
            ["camelCase", "CAMEL_CASE"],
            ["PascalCase", "PASCAL_CASE"],
            ["snake_case", "SNAKE_CASE"],
            ["XMLRequest", "XML_REQUEST"],
            ["XmlRequest", "XML_REQUEST"],
            ["Vector2D", "VECTOR_2D"],
            ["Render3DView", "RENDER_3D_VIEW"],
            ["Int32Buffer", "INT32_BUFFER"],
        ];
        tester.runTestCases(identifiers.toScreamingSnakeCase, testCases);
    });

    test("splitIdentifier", () => {
        const testCases: [string, string[]][] = [
            ["camelCase", ["camel", "Case"]],
            ["PascalCase", ["Pascal", "Case"]],
            ["snake_case", ["snake", "case"]],
            ["XMLRequest", ["XML", "Request"]],
            ["Vector2D", ["Vector", "2D"]],
            ["Render3DView", ["Render", "3D", "View"]],
            ["Int32Buffer", ["Int32", "Buffer"]],
        ];
        tester.runTestCases(identifiers.splitIdentifier, testCases);
    });
});
