import * as vscode from 'vscode';
import aiMessage from "../lib/aiMessage";
import { insertText } from "../helpers";
import { isConnection } from "../extension";

const helpMeWithTailwindCss = async () => {

  if (!isConnection) {
    vscode.window.showErrorMessage("You need to add an API key");
    return;
  }

  let message: string | undefined = await vscode.window.showInputBox({
    prompt: "Enter your message",
  });

  if (!message) {
    return;
  }

  const res = await aiMessage(message);
  vscode.window.showInformationMessage(res);

  insertText(res);

};

export default helpMeWithTailwindCss;