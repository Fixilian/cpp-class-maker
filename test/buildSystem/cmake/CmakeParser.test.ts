import assert from 'assert';
import { CmakeCommand } from '../../../src/buildSystem/cmake/CmakeCommand';
import { CmakeParser } from '../../../src/buildSystem/cmake/CmakeParser';
import { readFileSync } from 'fs';

suite("CMake parser Test Suite", () => {

    test("findCmakeCommands searches for commands correctly", () => {
        const testCases = new Map<string, string[]>([
            ['test_workspace/unit_tests/cmake/findCmakeCommands_all.txt', ['set', 'add_library', 'add_executable']],
            ['test_workspace/unit_tests/cmake/findCmakeCommands_edge.txt', ['set', 'add_library']],
        ]);
        for (const testCase of testCases) {
            const [filepath, expectedCommands] = testCase;
            const cmake = readFileSync(filepath, "utf8");
            const parser = new CmakeParser(cmake);

            const commands = parser.findCmakeCommands(['set', 'add_library', 'add_executable']);
            assert.equal(commands.length, expectedCommands.length);

            const commandSet = new Set<string>();
            commands.forEach((command) => {
                commandSet.add(command.name);
                const contains = expectedCommands.includes(command.name);
                assert.equal(contains, true);
            });
            assert.equal(commandSet.size, expectedCommands.length);
        }
    });

    test("findCmakeCommands returns correct indexes", () => {
        const testCases: [string, CmakeCommand][] = [
            ['set(SOURCES alloc.cpp ops.cpp)', {name: "set", nameStart: 0, argsStart: 4, end: 30}],
            ['add_library (lib STATIC lib.cpp)', {name: "add_library", nameStart: 0, argsStart: 13, end: 32}],
            ['\n\t\nadd_executable (app main.cpp logger.cpp)',
                {name: "add_executable", nameStart: 3, argsStart: 19, end: 43}],
        ];
        for (const testCase of testCases) {
            const [cmake, expectedCommand] = testCase;
            const parser = new CmakeParser(cmake);
            const commands = parser.findCmakeCommands(['set', 'add_library', 'add_executable']);

            assert.equal(commands.length, 1);
            const command = commands[0];
            assert.deepEqual(command, expectedCommand);
        }
    });

    test("parseCmakeCommandArgs", () => {
        const testCases: [string, CmakeCommand, string[]][] = [
            ['set(SOURCES alloc.cpp ops.cpp)', {name: "set", nameStart: 0, argsStart: 4, end: 30},
                ['SOURCES', 'alloc.cpp', 'ops.cpp']],
            ['add_library (lib STATIC lib.cpp)', {name: "add_library", nameStart: 0, argsStart: 13, end: 32},
                ['lib', 'STATIC', 'lib.cpp']],
            ['\n\t\nadd_executable (app\n\tmain.cpp\n\tlogger.cpp\n\tmath.cpp\n)',
                {name: "add_library", nameStart: 3, argsStart: 19, end: 56},
                ['app', 'main.cpp', 'logger.cpp', 'math.cpp']],
        ];
        for (const testCase of testCases) {
            const [cmake, command, expetedArgs] = testCase;
            const parser = new CmakeParser(cmake);
            const args = parser.parseCmakeCommandArgs(command);
            for (let j = 0; j < expetedArgs.length; j += 1) {
                assert.equal(args[j], expetedArgs[j]);
            }
        }
    });

    test("findFileInsertPosition when not first src file", () => {
        const cmake = 'add_library (lib STATIC\n\talpha.cpp\n\tbeta.cpp\n\tgamma.cpp\n)';
        const parser = new CmakeParser(cmake);
        const command = {name: "add_library", nameStart: 0, argsStart: 13, end: 57};
        const testCases: [string, number][] = [
            ['aa.cpp', 23],
            ['bb.cpp', 34],
            ['test.cpp', 55],
        ];
        for (const testCase of testCases) {
            const [filename, pos] = testCase;
            const actual = parser.findFileInsertPosition(command, filename);
            assert.equal(actual, pos);
        }
    });

    test("findFileInsertPosition when first src file", () => {
        const filename = 'aa.cpp';
        const testCases: [string, number, CmakeCommand][] = [
            ['add_library (lib STATIC\n\t\n)', 23,
                {name: "add_library", nameStart: 0, argsStart: 13, end: 27}],
            ['add_library (lib STATIC\n)', 23,
                {name: "add_library", nameStart: 0, argsStart: 13, end: 25}],
            ['add_library (lib STATIC )', 23,
                {name: "add_library", nameStart: 0, argsStart: 13, end: 25}],
            ['add_library (lib STATIC)', 23,
                {name: "add_library", nameStart: 0, argsStart: 13, end: 24}],
        ];
        for (const testCase of testCases) {
            const [cmake, pos, command] = testCase;
            const parser = new CmakeParser(cmake);
            const actual = parser.findFileInsertPosition(command, filename);
            assert.equal(actual, pos);
        }
    });
});
