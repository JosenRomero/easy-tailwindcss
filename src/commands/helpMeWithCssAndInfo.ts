import * as vscode from 'vscode';
import aiMessage from "../lib/aiMessage";
import { insertText } from "../helpers";
import { isConnection } from "../extension";

const helpMeWithCssAndInfo = async (text: string) => {

  if (!isConnection) {
    vscode.window.showErrorMessage("You need to add an API key");
    return;
  }

  if (!text) {
    vscode.window.showWarningMessage("If you want to get a TailwindCSS utility class, you can use the command 'Help me with TailwindCSS'.");
    return;
  }

  const res = await aiMessage(text);
 
  if (res) {
    insertText(res);
  } else {
    vscode.window.showErrorMessage("Something went wrong.");
  }

};

export default helpMeWithCssAndInfo;