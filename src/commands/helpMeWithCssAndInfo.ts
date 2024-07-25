import * as vscode from 'vscode';
import aiMessage from "../lib/aiMessage";
import { insertText } from "../helpers";
import { isConnection } from "../extension";

const helpMeWithCssAndInfo = async (text: string) => {

  if (!isConnection) {
    vscode.window.showErrorMessage("You need to add an API key");
    return;
  }

  const res = await aiMessage(text);

  insertText(res);

};

export default helpMeWithCssAndInfo;