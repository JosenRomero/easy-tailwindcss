import * as vscode from 'vscode';

export const insertText = async (text: string) => {

  const editor = vscode.window.activeTextEditor;

  if (editor) {

    editor.edit((editBuilder: vscode.TextEditorEdit) => {

      const selection = editor.selection;
  
      if (selection.isEmpty) {
        editBuilder.insert(selection.active, text.trim());
      } else {
        // Replace selected text
        editBuilder.replace(selection, text.trim());
      }
  
    });
    
  } else {

    await vscode.env.clipboard.writeText(text);
    vscode.window.showInformationMessage("The TailwindCSS class has been copied to the clipboard.");

  }

};