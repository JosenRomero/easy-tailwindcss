import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "easy-tailwindcss" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('easy-tailwindcss.helpMeWithTailwindCss', async () => {
		
		let message: string | undefined = await vscode.window.showInputBox({
			prompt: "Enter your message",
		});

		if (message) {
			vscode.window.showInformationMessage(message);
		}

	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
