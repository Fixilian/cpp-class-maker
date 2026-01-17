import * as vscode from 'vscode';

let _logger: Logger | undefined;

/**
 * Returns a shared logger instance for the extension.
 */
export function getLogger(): Logger {
    if (!_logger) {
        _logger = new Logger('Cpp Class Maker');
    }
    return _logger;
}

/**
 * Disposes the shared logger instance.
 */
export function disposeLogger(): void {
    if (_logger) {
        _logger.dispose();
    }
}

/**
 * Provides unified logging for the extension using VS Code's built-in LogOutputChannel.
 */
export class Logger implements vscode.Disposable {

    private readonly channel: vscode.LogOutputChannel;

    /**
     * @param name The name of the log channel as displayed in VS Code’s “Output” panel.
     */
    constructor(name: string) {
        this.channel = vscode.window.createOutputChannel(name, { log: true });
    }

    /**
     * Logs debug information for developers.
     */
    debug(message: string): void {
        this.channel.debug(message);
    }

    /**
     * Logs general information about the extension’s behavior.
     */
    info(message: string): void {
        this.channel.info(message);
    }

    /**
     * Logs warnings about potential problems.
     */
    warn(message: string): void {
        this.channel.warn(message);
    }

    /**
     * Logs errors along with optional details.
     */
    error(message: string, error?: any): void {
        if (error) {
            if (error instanceof Error) {
                const details = error.stack ?? error.message;
                this.channel.error(`${message} - ${details}`);
            } else {
                this.channel.error(`${message} - ${error}`);
            }
        } else {
            this.channel.error(message);
        }
    }

    dispose(): void {
        this.channel.dispose();
    }
}
