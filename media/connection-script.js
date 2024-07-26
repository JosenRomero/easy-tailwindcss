
(function() {

  const vscode = acquireVsCodeApi();

  const btn = document.getElementById("btn-addAPIkey");

  btn.addEventListener('click', () => {

    vscode.postMessage({
      command: 'askAPIkey'
    });

  });

}());