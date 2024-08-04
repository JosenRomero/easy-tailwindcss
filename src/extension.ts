import * as vscode from 'vscode';
import * as commands from "./commands";
import * as providers from "./providers";
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
      providers.ConnectionWebViewProvider.viewType,
      new providers.ConnectionWebViewProvider(context.extensionUri)
    )
  );

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      providers.MessageWebViewProvider.viewType,
      new providers.MessageWebViewProvider(context.extensionUri)
    )
  );

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      providers.HelpAndFeedbackWebviewProvider.viewType,
      new providers.HelpAndFeedbackWebviewProvider(context.extensionUri)
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

      apikey = await vscode.window.showInputBox({
        prompt: "Enter your Gemini API key"
      });
	
      if (apikey) {
        await context.secrets.store("apikey", apikey);
        createGenAi(apikey);
        vscode.window.showInformationMessage("API key successfully added!");
      }

    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("easy-tailwindcss.removeAPIkey", async () => {

      if (apikey) {
        await context.secrets.delete("apikey");
        isConnection = false;
        apikey = undefined;
        vscode.window.showInformationMessage("Your API key has been removed.");
      } else {
        vscode.window.showInformationMessage("No API key found.");
      }

    })
  );

}

export function deactivate() {}
