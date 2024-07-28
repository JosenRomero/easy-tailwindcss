
// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.
(function() {

  const vscode = acquireVsCodeApi();

  let showError = false; // show the error only once
  const input = document.getElementById("addMessage");
  const btn = document.getElementById("btn-addMessage");

  // Restore state
  const state = vscode.getState();
  if (state) {
    input.value = state.inputValue || "";
  }

  input.addEventListener('change', (e) => {
    updateState({ inputValue: e.target.value });
  });

  btn.addEventListener('click', () => {

    if (input.value !== "") {
      
      vscode.postMessage({
        command: 'helpMeWithCssAndInfo',
        text: input.value
      });

      input.value = "";
      updateState({ inputValue: "" });

    } else {

      if (!showError) {
        vscode.postMessage({
          command: 'showError',
          text: "A message is required"
        });
        showError = true;
      }

    }
      
  });

  const updateState = (item) => {
    vscode.setState(item);
  };

}());