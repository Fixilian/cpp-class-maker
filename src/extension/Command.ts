import * as vscode from 'vscode';
import { ExtensionContextManager } from './ExtensionContextManager';

/**
 * Represents an executable command within the extension.
 *
 * @param ctxManager The extension context manager.
 * @param uri URI from file explorer.
 * @returns The command result, if any.
 */
export type Command = (ctxManager: ExtensionContextManager, uri: vscode.Uri) => Promise<any>;
