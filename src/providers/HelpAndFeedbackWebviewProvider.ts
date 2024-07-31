import * as vscode from 'vscode';

export class HelpAndFeedbackWebviewProvider implements vscode.WebviewViewProvider {

  public static readonly viewType = "easy-tailwindcss.helpAndFeedbackView";

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView, 
    context: vscode.WebviewViewResolveContext, 
    _token: vscode.CancellationToken
  ): void {

    webviewView.webview.options = {

      enableScripts: true,

      localResourceRoots: [this._extensionUri]

    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
    
  }

  public _getHtmlForWebview(webview: vscode.Webview): string {

    const styleUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "main.css")
    );

    return `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link href="${styleUri}" rel="stylesheet">
          <title>Help and Feedback</title>
        </head>
        <body>
          <div class="container">

            <div class="disclaimer">
              <p>Note: This extension is not an official TailwindCSS product.</p>
            </div>

            <a href="https://github.com/JosenRomero/easy-tailwindcss" target="_blank">Extension Documentation</a>
            <a href="https://github.com/JosenRomero/easy-tailwindcss/issues" target="_blank">Report a Bug</a>
            <a href="https://tailwindcss.com/docs/installation" target="_blank">TailwindCss Documentation</a>
            
          </div>
          
        </body>
        </html>
    `;

  }

};