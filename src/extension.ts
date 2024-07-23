import * as vscode from 'vscode';
import * as commands from "./commands";
import { GoogleGenerativeAI } from "@google/generative-ai";

export let genAI: GoogleGenerativeAI;

export async function activate(context: vscode.ExtensionContext) {

	let apikey: string | undefined = await context.secrets.get("apikey");

	if (apikey) {
		genAI = new GoogleGenerativeAI(apikey);
	}

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('easy-tailwindcss.helpMeWithTailwindCss', commands.helpMeWithTailwindCss);

	context.subscriptions.push(disposable);
}

export function deactivate() {}
