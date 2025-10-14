import assert from 'assert';
import { CmakeCommand } from '../../../src/BuildSystem/Cmake/CmakeCommand';
import { CmakeParser } from '../../../src/BuildSystem/Cmake/CmakeParser';
import * as tester from '../../TestUtility/Tester';
import { readFileSync } from 'fs';


suite("CMake parser Test Suite", () => {

    test("findCmakeCommands", () => {
        const testPath = 'test_workspace/unit_tests/cmake/findCmakeCommands.txt';
        const cmake = readFileSync(testPath, "utf8");
        const expected = new Map<string, CmakeCommand>([
            ['set', new CmakeCommand("set", 0, 4, 63)],
            ['add_library', new CmakeCommand("add_library", 65, 78, 98)],
            ['add_executable', new CmakeCommand("add_executable", 224, 239, 270)],
        ]);
        const parser = new CmakeParser(cmake);
        const commands = parser.findCmakeCommands(['set', 'add_library', 'add_executable']);
        commands.forEach((command) => {
            const expectedCommand = expected.get(command.name);
            if (!expectedCommand) {
                assert.fail();
            }
            assert.deepStrictEqual(command, expectedCommand);
        });
    });

    test("parseCmakeCommandArgs", () => {
        const testCases: [string, CmakeCommand, string[]][] = [
            ['set(SOURCES alloc.cpp ops.cpp)', new CmakeCommand('set', 0, 4, 30), 
                ['SOURCES', 'alloc.cpp', 'ops.cpp']],
            ['add_library (libchip8 STATIC lib.cpp)', new CmakeCommand('add_library', 0, 13, 37),
                ['libchip8', 'STATIC', 'lib.cpp']],
        ];
        for (let i = 0; i < testCases.length; i += 1) {
            const testCase = testCases[i];
            const cmake = testCase[0];
            const parser = new CmakeParser(cmake);
            const command = testCase[1];
            const args = parser.parseCmakeCommandArgs(command);
            const expected = testCase[2];
            for (let j = 0; j < expected.length; j += 1) {
                assert.equal(args[j], expected[j]);
            }
        }
    });

    test("findFileInsertPosition", () => {
        const cmake = 'add_library (libchip8 STATIC\n\talpha.cpp\n\tbeta.cpp\n\tgamma.cpp\n)';
        const parser = new CmakeParser(cmake);
        const command = new CmakeCommand('add_library', 0, 13, 62);
        const testCases: [string, number][] = [
            ['aa.cpp', 30],
            ['bb.cpp', 41],
            ['test.cpp', 61], 
        ];
        for (let i = 0; i < testCases.length; i += 1) {
            const testCase = testCases[i];
            const actual = parser.findFileInsertPosition(command, testCase[0]);
            assert.equal(actual, testCase[1]);
        }
    });
});
