/**
 * CmakeCommand describes cmake command.
 */
export class CmakeCommand {
    /** Command name. */
    readonly name: string;

    /** Offset in the file to the beginning of the command name. */
    readonly nameStart: number;

    /**
     * Offset in the file to the beginning of the command arguments. 
     * I.e. points to the character after '('.
     */
    readonly argsStart: number;

    /** Offset in the file to the end of the command. I.e. points to the character after ')'. */
    readonly end: number;

    /**
     * @param name command name.
     * @param nameStart offset in the file to the beginning of the command name.
     * @param argsStart offset in the file to the beginning of the command arguments. 
     * @param end offset in the file to the end of the command.
     */
    constructor(name: string, nameStart: number, argsStart: number, end: number) {
        this.name = name;
        this.nameStart = nameStart;
        this.argsStart = argsStart;
        this.end = end;
    }
}
