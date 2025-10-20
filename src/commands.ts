import * as vscode from 'vscode';

export type Callback = (args: any[]) => any;

export const commandRegistry = new Map<string, Callback>([
    ['cppClassMaker.newClass', newClassCommand],
    ['cppClassMaker.newClassNoTest', newClassNoTestCommand],
    ['cppClassMaker.newHeader', newHeaderCommand],
    ['cppClassMaker.newTemplateClass', newTemplateClassCommand],
    ['cppClassMaker.newTemplateClassNoTest', newTemplateClassNoTestCommand],
]);

function newClassCommand () {
    vscode.window.showInformationMessage('New Class!');
};

function newClassNoTestCommand () {
    vscode.window.showInformationMessage('New Class w/o test!');
};

function newHeaderCommand () {
    vscode.window.showInformationMessage('New Header!');
};

function newTemplateClassCommand () {
    vscode.window.showInformationMessage('New Template Class!');
};

function newTemplateClassNoTestCommand () {
    vscode.window.showInformationMessage('New Template Class w/o test!');
};

function getDestinationUri(args: any[]): vscode.Uri {
    // first element is uri when command was called from context menu
    const uri = args[0];
    return vscode.Uri.from(uri);
}

