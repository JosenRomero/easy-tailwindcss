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

export const insertTextInARange = (text: string, range: vscode.Range, newPosition: vscode.Position) => {

  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showInformationMessage("No editor is active");
    return;
  }

  editor.edit((editBuilder: vscode.TextEditorEdit) => {

    editBuilder.replace(range, text);

  }).then(() => {
    
    editor.selection = new vscode.Selection(newPosition, newPosition);

  });

};

export const searchMessage = (text: string): string | undefined => {

  const completePattern = /(?:class|className)=["'][^|<>"']*[\|][^|<>"']+\|/;
  const removePattern = /(?:class|className)=["'][^|<>"']*[\|]/;

  const match = text.match(completePattern); // class='|message|'

  if (!match || match.length > 1) {
    return;
  }

  const message: string = match[0].replace(removePattern, "").slice(0, -1); // message

  return message;
  
};

export const getLine = (): vscode.TextLine | undefined => {

  const editor = vscode.window.activeTextEditor;

  const line = editor?.document.lineAt(editor?.selection.active);

  return line;

};
