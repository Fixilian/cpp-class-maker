import { asIdentifier, Identifier } from '../identifier';
import * as identifiers from '../identifiers';
import * as tester from './tester';

suite("Identifiers Module Test Suite", () => {

    test("toCamelCase", () => {
        const testCases: [Identifier, string][] = [
            [asIdentifier("camelCase"), "camelCase"],
            [asIdentifier("PascalCase"), "pascalCase"],
            [asIdentifier("snake_case"), "snakeCase"],
            [asIdentifier("XMLRequest"), "xmlRequest"],
            [asIdentifier("XmlRequest"), "xmlRequest"],
            [asIdentifier("Vector2D"), "vector2D"],
            [asIdentifier("Render3DView"), "render3DView"],
            [asIdentifier("Int32Buffer"), "int32Buffer"],
        ];
        tester.runTestCases(identifiers.toCamelCase, testCases);
    }); 

    test("toPascalCase", () => {
        const testCases: [Identifier, string][] = [
            [asIdentifier("camelCase"), "CamelCase"],
            [asIdentifier("PascalCase"), "PascalCase"],
            [asIdentifier("snake_case"), "SnakeCase"],
            [asIdentifier("XMLRequest"), "XMLRequest"],
            [asIdentifier("XmlRequest"), "XmlRequest"],
            [asIdentifier("Vector2D"), "Vector2D"],
            [asIdentifier("Render3DView"), "Render3DView"],
            [asIdentifier("Int32Buffer"), "Int32Buffer"],
        ];
        tester.runTestCases(identifiers.toPascalCase, testCases);
    }); 

    test("toSnakeCase", () => {
        const testCases: [Identifier, string][] = [
            [asIdentifier("camelCase"), "camel_case"],
            [asIdentifier("PascalCase"), "pascal_case"],
            [asIdentifier("snake_case"), "snake_case"],
            [asIdentifier("XMLRequest"), "xml_request"],
            [asIdentifier("XmlRequest"), "xml_request"],
            [asIdentifier("Vector2D"), "vector_2d"],
            [asIdentifier("Render3DView"), "render_3d_view"],
            [asIdentifier("Int32Buffer"), "int32_buffer"],
        ];
        tester.runTestCases(identifiers.toSnakeCase, testCases);
    }); 

    test("toScreamingSnakeCase", () => {
        const testCases: [Identifier, string][] = [
            [asIdentifier("camelCase"), "CAMEL_CASE"],
            [asIdentifier("PascalCase"), "PASCAL_CASE"],
            [asIdentifier("snake_case"), "SNAKE_CASE"],
            [asIdentifier("XMLRequest"), "XML_REQUEST"],
            [asIdentifier("XmlRequest"), "XML_REQUEST"],
            [asIdentifier("Vector2D"), "VECTOR_2D"],
            [asIdentifier("Render3DView"), "RENDER_3D_VIEW"],
            [asIdentifier("Int32Buffer"), "INT32_BUFFER"],
        ];
        tester.runTestCases(identifiers.toScreamingSnakeCase, testCases);
    }); 

    test("splitIdentifier", () => {
        const testCases: [Identifier, string[]][] = [
            [asIdentifier("camelCase"), ["camel", "Case"]],
            [asIdentifier("PascalCase"), ["Pascal", "Case"]],
            [asIdentifier("snake_case"), ["snake", "case"]],
            [asIdentifier("XMLRequest"), ["XML", "Request"]],
            [asIdentifier("Vector2D"), ["Vector", "2D"]],
            [asIdentifier("Render3DView"), ["Render", "3D", "View"]],
            [asIdentifier("Int32Buffer"), ["Int32", "Buffer"]],
        ];
        tester.runTestCases(identifiers.splitIdentifier, testCases);
    }); 
});
