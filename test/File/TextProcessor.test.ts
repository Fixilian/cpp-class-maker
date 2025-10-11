import * as tester from '../TestUtility/Tester';
import { TextProcessor } from '../../src/File/TextProcessor';
import { readFileSync } from 'node:fs';
import * as path from 'path';

suite("TextProcessor Test Suite", () => {
    const constants = new Map<string, string>([
        ['CPP', '.cpp'], 
        ['HPP', '.hpp'], 
        ['C', '.c'], 
        ['H', '.h'], 
        ['HEADER', 'StringBuilder.hpp'],
        ['HEADER_PATH', 'base/string/StringBuilder.hpp'],
        ['C_HEADER', 'StringBuilder.h'],
        ['C_HEADER_PATH', 'base/string/StringBuilder.h'],
        ['NAME', 'StringBuilder'], 
        ['NAME_CAMEL', 'stringBuilder'], 
        ['NAME_PASCAL', 'StringBuilder'], 
        ['NAME_SNAKE', 'string_builder'], 
        ['NAME_SCREAM', 'STRING_BUILDER'], 
        ['NAMESPACE', 'strings'], 
        ['PATH', 'BASE_STRING'], 
        ['PATH_WIDE', 'BASE__STRING'],
        ['HEADER_GUARD', 'BASE_STRING_STRING_BUILDER_H'], 
        ['C_HEADER_GUARD', 'BASE_STRING_STRING_BUILDER_H'], 
    ]); 
    const processor = new TextProcessor(constants);
    const processFunc = processor.process.bind(processor);
    
    test("Process file names", () => {
        const testCases: [string, string][] = [
            ["${NAME}${CPP}", "StringBuilder.cpp"],
            ["${NAME_SNAKE}${CPP}", "string_builder.cpp"],
            ["${NAME}${HPP}", "StringBuilder.hpp"],
            ["${NAME_SNAKE}${HPP}", "string_builder.hpp"],
            ["${NAME}Test${CPP}", "StringBuilderTest.cpp"],
            ["${NAME_SNAKE}_test${CPP}", "string_builder_test.cpp"],
            ["${NAME}${C}", "StringBuilder.c"],
            ["${NAME_SNAKE}${C}", "string_builder.c"],
            ["${NAME}${H}", "StringBuilder.h"],
            ["${NAME_SNAKE}${H}", "string_builder.h"],
        ];
        tester.runTestCases(processFunc, testCases);
    });

    test("Process header guards", () => {
        const testCases: [string, string][] = [
            ["${PATH}_${NAME_SCREAM}_H", "BASE_STRING_STRING_BUILDER_H"],
            ["${PATH_WIDE}__${NAME_SCREAM}_H", "BASE__STRING__STRING_BUILDER_H"],
            ["${NAME_SCREAM}_H", "STRING_BUILDER_H"],
        ];
        tester.runTestCases(processFunc, testCases);
    });

    test("Process file content", () => {
        const testCasesNames = [
            'c_header', 
            'c_source', 
            'class_header', 
            'class_source', 
            'class_test',
            'template_class_header'
        ];
        const testCases: [string, string][] = readTemplateTests(testCasesNames);
        tester.runTestCases(processFunc, testCases);
    });
});

function readTemplateTests(names: string[]): [string, string][] {
    let result: [string, string][] = [];

    const testCasesPath = 'test_workspace/unit_tests/template_tests';
    const templateSuffix = '_template.txt';
    const expectedSuffix = '_expected.txt';
    for (let i = 0; i < names.length; i += 1) {
        const templateFileName = names[i] + templateSuffix;
        const templateFilePath = path.join(testCasesPath, templateFileName);
        const template = readFileSync(templateFilePath, "utf8");

        const expectedFileName = names[i] + expectedSuffix;
        const expectedFilePath = path.join(testCasesPath, expectedFileName);
        const expected = readFileSync(expectedFilePath, "utf8");

        result.push([template, expected]);
    }

    return result;
}
