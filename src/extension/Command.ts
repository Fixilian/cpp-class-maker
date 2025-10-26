import { ExtensionContextManager } from './ExtensionContextManager';

/**
 * Represents an executable command within the extension.
 *
 * @param ctxManager The extension context manager.
 * @param args The command arguments.
 * @returns The command result, if any.
 */
export type Command = (ctxManager: ExtensionContextManager, args: any[]) => Promise<any>;
