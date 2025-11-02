import { ErrorCodes } from './ErrorCode';
import { ExtensionError } from './ExtensionError';

/**
 * Represents an error related to a workspace.
 *
 * Extends {@link ExtensionError} and provides a specific {@link ErrorCodes.Workspace} code.
 */
export class WorkspaceError extends ExtensionError {
    /**
     * @param message A human-readable description of the workspace error.
     */
    constructor(message: string) {
        super(`Workspace error: ${message}`, ErrorCodes.Wokspace);
    }
}
