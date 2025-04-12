import * as vscode from 'vscode';
import { APICallError } from "ai";
import aiMessage from "../lib/aiMessage";
import {searchMessage, getLine, insertTextInARange} from "../helpers";
import { AI_PROVIDERS } from '../models/IAmodels';

export const handleTextChange = (event: vscode.TextDocumentChangeEvent, currentModel: string | undefined): void => {
  const pattern: RegExp = /[\|]/;

  for (const change of event.contentChanges) {
    const text = change.text;
    const match = pattern.exec(text);
    if (match) {
      getTailwindCssInsideTheEditor(currentModel);
    }
  }

};

export const getTailwindCssInsideTheEditor = async (currentModel: string | undefined): Promise<void> => {

  try {

    const editor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;
    const line: vscode.TextLine | undefined = getLine();
    
    if (!editor || !line) {
      return;
    }

    const message: string | undefined = searchMessage(line.text);

    if (!message) {
      return;
    }

    if (!currentModel) {
      vscode.window.showErrorMessage("You need to add an API key");
      return;
    }

    const res: string = await aiMessage(message, currentModel as AI_PROVIDERS);
    const response: string = res.trim();
    
    // Replace the message with the response
    const newLineText: string = line.text.replace(`|${message}|`, response);

    // get new cursor position
    const currentCursorPosition: vscode.Position = editor.selection.active;
    const startIndex: number = line.text.indexOf(`|${message}|`);
    const newCharacterPosition: number = (startIndex !== -1) ? startIndex + response.length : newLineText.length;
    const newCursorPosition: vscode.Position = new vscode.Position(currentCursorPosition.line, newCharacterPosition);

    insertTextInARange(newLineText, line.range, newCursorPosition);

  } catch (error) {

    if (error instanceof APICallError) {
      vscode.window.showErrorMessage(error.message);
    } else {
      vscode.window.showErrorMessage("Something went wrong.");
    }
    
  }

};