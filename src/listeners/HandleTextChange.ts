import * as vscode from 'vscode';
import { APICallError } from "ai";
import aiMessage from "../lib/aiMessage";
import {searchMessage, getLine, insertTextInARange} from "../helpers";

export const handleTextChange = (event: vscode.TextDocumentChangeEvent): void => {
  const pattern: RegExp = /[\|]/;

  for (const change of event.contentChanges) {
    const text = change.text;
    const match = pattern.exec(text);
    if (match) {
      getTailwindCssInsideTheEditor();
    }
  }

};

export const getTailwindCssInsideTheEditor = async (): Promise<void> => {

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

    const res: string = await aiMessage(message);
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