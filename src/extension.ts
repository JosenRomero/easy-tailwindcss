import * as vscode from 'vscode';
import * as commands from "./commands";
import * as providers from "./providers";
import { handleTextChange } from "./listeners/HandleTextChange";
import { ProviderConfigService } from './services/ProviderConfigService';
import { AI_PROVIDERS, AI_PROVIDERS_ARRAY } from './models/IAmodels';

export let isConnection: Boolean = false;

export async function activate(context: vscode.ExtensionContext) {

  let apikey: string | undefined = await context.secrets.get("apikey");
  let current_iaProvider: string | undefined = await context.secrets.get("currentModel");

  const providerConfig = (apiKey: string, ia_provider: string) => {

    try {

      ProviderConfigService.createProvider(apiKey, ia_provider as AI_PROVIDERS);
      isConnection = true;

    } catch (error) {
      vscode.window.showErrorMessage("Something went wrong.");
    }

  };

  if (apikey) {

    if (!current_iaProvider) {
      current_iaProvider = AI_PROVIDERS.GEMINI;
      await context.secrets.store("currentModel", current_iaProvider);
    }

    providerConfig(apikey, current_iaProvider);

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
    vscode.commands.registerCommand("easy-tailwindcss.helpMeWithTailwindCss", () => {
      if (!current_iaProvider) {
        vscode.window.showErrorMessage("You need to add an API key");
        return;
      }
      commands.helpMeWithTailwindCss(current_iaProvider);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("easy-tailwindcss.helpMeWithCssAndInfo", async (text) => {
      if (!current_iaProvider) {
        vscode.window.showErrorMessage("You need to add an API key");
        return;
      }
      commands.helpMeWithCssAndInfo(text, current_iaProvider);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("easy-tailwindcss.askAPIkey", async () => {

      current_iaProvider = await vscode.window.showQuickPick(AI_PROVIDERS_ARRAY, {
        canPickMany: false,
        placeHolder: 'Select an AI provider'
      });

      if (!current_iaProvider) {
        return;
      }

      apikey = await vscode.window.showInputBox({
        prompt: `Enter your ${current_iaProvider} API key`,
        password: true
      });
	
      if (apikey) {
        await context.secrets.store("currentModel", current_iaProvider);
        await context.secrets.store("apikey", apikey);
        providerConfig(apikey, current_iaProvider);
        vscode.window.showInformationMessage("API key successfully added!");
      }

    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("easy-tailwindcss.removeAPIkey", async () => {

      if (!apikey) {
        vscode.window.showInformationMessage("No API key found.");
        return;
      }

      let response = await vscode.window.showInformationMessage(
        "Are you sure you want to REMOVE api key",
        { modal: true },
        "Yes", "No"
      );

      if (response !== "Yes") {
        return;
      }

      await context.secrets.delete("currentModel");
      await context.secrets.delete("apikey");
      isConnection = false;
      apikey = undefined;
      vscode.window.showInformationMessage("Your API key has been removed.");

    })
  );

  // Register the text change event listener
  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument((event: vscode.TextDocumentChangeEvent) => {
      handleTextChange(event, current_iaProvider);
    })
  );

}

export function deactivate() {}
