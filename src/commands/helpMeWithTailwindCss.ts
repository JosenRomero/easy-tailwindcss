import * as vscode from 'vscode';
import aiMessage from "../lib/aiMessage";
import { insertText } from "../helpers";

const helpMeWithTailwindCss = async () => {

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