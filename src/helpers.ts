import * as vscode from 'vscode';

export const insertText = (text: string) => {

  const editor = vscode.window.activeTextEditor;

  if (editor) {

    editor.edit((editBuilder: vscode.TextEditorEdit) => {

      const selection = editor.selection;
  
      if (selection.isEmpty) {
        editBuilder.insert(selection.active, text);
      } else {
        // Replace selected text
        editBuilder.replace(selection, text);
      }
  
    });
    
  }

};