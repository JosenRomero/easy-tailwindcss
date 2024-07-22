import * as vscode from 'vscode';
import * as commands from "./commands";

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "easy-tailwindcss" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('easy-tailwindcss.helpMeWithTailwindCss', commands.helpMeWithTailwindCss);

	context.subscriptions.push(disposable);
}

export function deactivate() {}
