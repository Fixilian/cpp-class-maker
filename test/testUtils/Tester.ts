import * as assert from 'assert';

/**
 * Runs multiple test cases through a function.
 * Each case is [input, expected].
 * If a test fails, prints the index and input along with assert error.
 *
 * @param fn function to test.
 * @param cases array of test cases.
 */
export function runTestCases<T, R>(fn: (input: T) => R, cases: [T, R][]) {
    for (let i = 0; i < cases.length; i++) {
        const [input, expected] = cases[i];
        try {
            const actual = fn(input);
            assert.deepStrictEqual(actual, expected);
        } catch (err) {
            console.error(`Failed test case #${i}`);
            console.error("Input:", input);
            throw err; // so node:test marks it as failed
        }
    }
}
