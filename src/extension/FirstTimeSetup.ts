import * as vscode from 'vscode';
import { showConfirmMessage } from '../ui/showConfirmMessage';
import { CONFIGURATION_NAME, GeneralSettings } from '../settings';

/**
 * Key used to store first-time interaction flag in global state.
 */
const FIRST_TIME_INTERACTION_KEY = 'FirstTimeInteraction';

/**
 * Result of the first-time setup process.
 */
export interface FirstTimeSetupResult {
    /**
     * Whether automatic adding to build system is allowed.
     */
    readonly isAutoAddToBuildSystemAllowed: boolean;

    /**
     * Whether automatic adding to source control manager is allowed.
     */
    readonly isAutoAddToSourceControlManagerAllowed: boolean;
}

/**
 * Handles first-time setup interactions with the user.
 */
export class FirstTimeSetup {
    /**
     * Extension context used for persisting global state.
     */
    private readonly ctx: vscode.ExtensionContext;

    /**
     * @param context Extension context.
     */
    constructor(context: vscode.ExtensionContext) {
        this.ctx = context;
    }

    /**
     * Checks whether this is the first interaction with the extension.
     *
     * @returns `true` if the setup has not been completed yet.
     */
    isFirstTimeInteraction(): boolean {
        const isFirstTime = this.ctx.globalState.get<boolean>(FIRST_TIME_INTERACTION_KEY);
        return isFirstTime === undefined;
    }

    /**
     * Runs the first-time setup flow asking the user for preferences.
     *
     * @returns Object describing user preferences for automatic actions.
     */
    async run(): Promise<FirstTimeSetupResult> {
        const detail = 'You can change this behavior later in settings.';
        const isAutoAddToBuildSystemAllowed = await showConfirmMessage(
            'Enable auto-add to build system?',
            detail
        );
        const isAutoAddToSourceControlManagerAllowed = await showConfirmMessage(
            'Enable auto-add to source control system?',
            detail
        );
        const result = {
            isAutoAddToBuildSystemAllowed: isAutoAddToBuildSystemAllowed === true,
            isAutoAddToSourceControlManagerAllowed: isAutoAddToSourceControlManagerAllowed === true,
        };

        this.ctx.globalState.update(FIRST_TIME_INTERACTION_KEY, false);

        const config = vscode.workspace.getConfiguration(CONFIGURATION_NAME);
        const settings = new GeneralSettings(config);
        await settings.setAutoAddToBuildSystemAllowed(result.isAutoAddToBuildSystemAllowed);
        await settings.setAutoAddSourceControlManagerAllowed(result.isAutoAddToSourceControlManagerAllowed);

        return result
    }
}
