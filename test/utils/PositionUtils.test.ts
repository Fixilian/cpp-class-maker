import * as assert from 'assert';
import * as utils from '../../src/utils/PositionUtils';

suite("Position Utils Module Test Suite", () => {

    test("getPosition", () => {
        const text = "0123\n5678\n9";

        let line = 0;
        let column = 0;
        for (let i = 0; i < text.length; i += 1) {
            if (text[i] === "\n") {
                line += 1;
                column = 0;
                continue;
            }
            const expected = {
                line: line,
                column: column
            };
            const actual = utils.getPosition(text, i);
            assert.equal(actual.line, expected.line);
            assert.equal(actual.character, expected.column);
            column += 1;
        }
    });
});
