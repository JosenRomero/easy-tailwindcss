import * as vscode from 'vscode';

export class ConnectionWebViewProvider implements vscode.WebviewViewProvider {

  public static readonly viewType = "easy-tailwindcss.connectionView";

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

    webviewView.webview.onDidReceiveMessage(message => {
      switch(message.command) {
        case 'askAPIkey':
          vscode.commands.executeCommand('easy-tailwindcss.askAPIkey');
          break;
      }
    });
    
  }

  private _getHtmlForWebview(webview: vscode.Webview): string {

    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "connection-script.js")
    );

    const styleUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "main.css")
    );

    return `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link href="${styleUri}" rel="stylesheet">
          <title>Connection</title>
        </head>
        <body>
          <div class="container">
            <button id="btn-addAPIkey">Add your API key</button>
          </div>
          <script src="${scriptUri}" />
  
        </body>
        </html>
    `;

  }

}