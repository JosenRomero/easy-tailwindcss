
// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.
(function() {

  const vscode = acquireVsCodeApi();

  let value = "";
  let showError = false; // show the error only once
  const input = document.getElementById("addMessage");
  const btn = document.getElementById("btn-addMessage");

  input.addEventListener('change', (e) => {

    value += e.target.value;

  });

  btn.addEventListener('click', () => {

    if (value !== "") {
      vscode.postMessage({
        command: 'helpMeWithCssAndInfo',
        text: value
      });
      value = "";
    } 
    
    if (!showError) {
      vscode.postMessage({
        command: 'showError',
        text: "A message is required"
      });
      showError = true;
    }
      
  });

}());