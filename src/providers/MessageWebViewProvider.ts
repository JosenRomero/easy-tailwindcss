import * as vscode from 'vscode';

export class MessageWebViewProvider implements vscode.WebviewViewProvider {

  // The viewType must match the id field in package.json
  public static readonly viewType = "easy-tailwindcss.messagesView";

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView, 
    context: vscode.WebviewViewResolveContext, 
    _token: vscode.CancellationToken
  ): void {

    webviewView.webview.options = {

      // Allow scripts in the webview
      enableScripts: true,

      localResourceRoots: [this._extensionUri]

    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
    
  }

  private _getHtmlForWebview(webview: vscode.Webview): string {

    // Get the local path to main script run in the webview, then convert it to a uri we can use in the webview.
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "message-script.js")
    );

    // Do the same for the stylesheet.
    const styleUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "message-style.css")
    );
    
    return `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link href="${styleUri}" rel="stylesheet">
          <title>Webview</title>
        </head>
        <body>
          <input type="text" id="addMessage" placeholder="Enter your message">
          <button id="btn-addMessage">Send</button>
          <script src="${scriptUri}" />
  
        </body>
        </html>
    `;

  }

}