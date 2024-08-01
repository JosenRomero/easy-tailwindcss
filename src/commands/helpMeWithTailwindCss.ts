import * as vscode from 'vscode';
import { APICallError } from "ai";
import aiMessage from "../lib/aiMessage";
import { insertText } from "../helpers";
import { isConnection } from "../extension";

const helpMeWithTailwindCss = async () => {

  try {

    if (!isConnection) {
      vscode.window.showErrorMessage("You need to add an API key");
      return;
    }
  
    let message: string | undefined = await vscode.window.showInputBox({
      prompt: "Describe what you want to achieve with TailwindCSS",
    });
  
    if (!message) {
      return;
    }
  
    const res = await aiMessage(message);

    insertText(res);
    
  } catch (error) {

    if (error instanceof APICallError) {
      vscode.window.showErrorMessage(error.message);
    } else {
      vscode.window.showErrorMessage("Something went wrong.");
    }
    
  }

};

export default helpMeWithTailwindCss;