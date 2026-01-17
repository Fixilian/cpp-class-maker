/**
 * Describes cmake command.
 */
export interface CmakeCommand {
    /**
     * The command name.
     */
    readonly name: string;

    /**
     * Offset in the file to the beginning of the command name.
     */
    readonly nameStart: number;

    /**
     * Offset in the file to the beginning of the command arguments.
     * I.e. points to the character after '('.
     */
    readonly argsStart: number;

    /**
     * Offset in the file to the end of the command. I.e. points to the character after ')'.
     */
    readonly end: number;
}
