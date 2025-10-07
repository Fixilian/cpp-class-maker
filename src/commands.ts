import * as vscode from 'vscode';

export type Callback = (args: any[]) => any;

export const commandRegistry = new Map<string, Callback>([
    ['cpp-class-maker.newClass', newClassCommand], 
    ['cpp-class-maker.newClassNoTest', newClassNoTestCommand], 
    ['cpp-class-maker.newHeader', newHeaderCommand], 
    ['cpp-class-maker.newTemplateClass', newTemplateClassCommand], 
    ['cpp-class-maker.newTemplateClassNoTest', newTemplateClassNoTestCommand], 
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
