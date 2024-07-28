import * as vscode from 'vscode';
import * as commands from "./commands";
import { MessageWebViewProvider } from "./providers/MessageWebViewProvider";
import { ConnectionWebViewProvider } from "./providers/ConnectionWebViewProvider";
import { createGoogleGenerativeAI, GoogleGenerativeAIProvider } from "@ai-sdk/google";

export let genAI: GoogleGenerativeAIProvider;

export let isConnection: Boolean = false;

export async function activate(context: vscode.ExtensionContext) {

  let apikey: string | undefined = await context.secrets.get("apikey");

  const createGenAi = (apiKey: string) => {
    genAI = createGoogleGenerativeAI({ apiKey });
    isConnection = true;
  };

  if (apikey) {
    createGenAi(apikey);
  }

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      MessageWebViewProvider.viewType,
      new MessageWebViewProvider(context.extensionUri)
    )
  );

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      ConnectionWebViewProvider.viewType,
      new ConnectionWebViewProvider(context.extensionUri)
    )
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json

  context.subscriptions.push(
    vscode.commands.registerCommand("easy-tailwindcss.helpMeWithTailwindCss", commands.helpMeWithTailwindCss)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("easy-tailwindcss.helpMeWithCssAndInfo", commands.helpMeWithCssAndInfo)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("easy-tailwindcss.askAPIkey", async () => {

      let value = await vscode.window.showInputBox({
        prompt: "Enter your Gemini API key"
      });
	
      if (value) {
        await context.secrets.store("apikey", value);
        createGenAi(value);
        vscode.window.showInformationMessage("API key successfully added!");
      }

    })
  );

}

export function deactivate() {}
