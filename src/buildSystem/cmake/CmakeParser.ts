import { isUpperLetter, isLowerLetter, isDigit, isWhitespace } from '../../utils/Chars';
import { CmakeCommand } from './CmakeCommand';

/**
 * Represents a simplified CMake parser.
 */
export class CmakeParser {
    /**
     * The cmake file content.
     */
    private content: string;

    /**
     * @param content The cmake file text.
     */
    constructor(content: string) {
        this.content = content;
    }

    /**
     * Scans a CMake file and extracts top-level command invocations.
     * - Ignores lines starting with # (comments).
     * - Does not support nested parentheses or quoted strings.
     * - Only processes commands listed in commandNames.
     *
     * @param commandNames The list of command names to find (e.g., ["add_executable", "add_library"]).
     * @returns An array of cmake commands found in the file.
     */
    findCmakeCommands(commandNames: string[]): CmakeCommand[] {
        const content = this.content;
        const results: CmakeCommand[] = [];
        const commandsSet = new Set(commandNames);
        const length = content.length;
        let i = 0;

        while (i < length) {
            const ch = content[i];

            // Skip comments
            if (ch === '#') {
                while (i < length && content[i] !== '\n') {
                    i++;
                }
                i++;
                continue;
            }

            // Skip non-ident characters
            if (!this.isIdentifierStart(ch)) {
                i++;
                continue;
            }

            // Read identifier
            const start = i;
            while (i < length && this.isIdentifierChar(content[i])) {
                i++;
            }
            const name = content.slice(start, i);

            // Skip whitespace before '('
            while (i < length && isWhitespace(content[i])) {
                i++;
            }

            // Must be followed by '('
            if (content[i] !== '(') {
                continue;
            }

            // Skip commands we are not interested in
            if (!commandsSet.has(name)) {
                // Fast-skip to the next ')'
                while (i < length && content[i] !== ')') {
                    i++;
                }
                if (i < length) {
                    i++; // consume ')'
                }
                continue;
            }

            // Extract command range
            const nameStart = start;
            const argsStart = i + 1;
            const end = content.indexOf(')', argsStart);
            if (end === -1) {
                // No closing parenthesis found - ignore malformed command
                break;
            }

            results.push({name, nameStart, argsStart, end: end + 1});
            i = end + 1;
        }

        return results;
    }

    /**
     * Extracts all arguments of a CMake command.
     *
     * This function returns a list of raw argument tokens between the parentheses
     * of the given command. The parsing is whitespace-based and does not handle
     * nested parentheses or quoted strings.
     *
     * @param command The command descriptor object.
     * @returns An array of argument strings. Empty if there are no arguments.
     */
    parseCmakeCommandArgs(command: CmakeCommand): string[] {
        // Extract substring containing the arguments (between '(' and ')')
        const argsText = this.content.slice(command.argsStart, command.end - 1);

        // Trim and split arguments by whitespace
        const tokens = argsText.trim().split(/\s+/);

        // Filter out empty tokens (in case of extra whitespace)
        return tokens.filter(arg => arg.length > 0);
    }

    /**
     * Finds the position to insert a new file in a CMake command's arguments.
     *
     * Assumes:
     *  - Files are already sorted alphabetically.
     *  - Only the arguments containing '.' are considered files.
     *
     * @param content The cMake file content.
     * @param command The command descriptor.
     * @param filename The file to insert (e.g. "foo.cpp").
     * @returns Offset where the file should be inserted.
     */
    findFileInsertPosition(command: CmakeCommand, filename: string): number {
        const content = this.content;
        const args = this.parseCmakeCommandArgs(command);

        // Metadata: all arguments before the first file
        const metadataCount = args.findIndex(arg => arg.includes('.'));
        const firstFileIndex = metadataCount === -1 ? args.length : metadataCount;
        const fileArgs = args.slice(firstFileIndex);

        // Find index of the first file that should come after the new file
        let insertIndex = fileArgs.findIndex(f => f.localeCompare(filename) > 0);
        if (insertIndex === -1) {
            insertIndex = fileArgs.length;
        }

        if (insertIndex === fileArgs.length) {
            // Insert at the end of the args list
            if (args.length > 0) {
                const last = args[args.length - 1];
                return content.indexOf(last, command.argsStart) + last.length;
            }

        } else {
            // Insert before the file at insertIndex
            const prevIndex = firstFileIndex + insertIndex - 1;
            if (prevIndex >= 0) {
                const prev = args[prevIndex];
                return content.indexOf(prev, command.argsStart) + prev.length;
            }
        }

        return command.argsStart;
    }

    /**
     * Returns `true` if the character can start a CMake identifier (A–Z, a–z, _).
     */
    private isIdentifierStart(ch: string): boolean {
        const code = ch.charCodeAt(0);
        return isUpperLetter(code) || isLowerLetter(code) || ch === '_';
    }

    /**
     * Returns `true` if the character can appear inside a CMake identifier (A-Z, a-z, 0-9, _).
     */
    private isIdentifierChar(ch: string): boolean {
        const code = ch.charCodeAt(0);
        return isUpperLetter(code) || isLowerLetter(code) || isDigit(code) || ch === '_';
    }
}
