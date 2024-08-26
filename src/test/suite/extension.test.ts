import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
  vscode.window.showInformationMessage('Start all tests.');

  suiteSetup( async () => {

    const ext = vscode.extensions.getExtension('josenromero.easy-tailwindcss');
    await ext?.activate();

  });

  test('Sample test', () => {
    assert.strictEqual(-1, [1, 2, 3].indexOf(5));
    assert.strictEqual(-1, [1, 2, 3].indexOf(0));
  });

  test('can activate the extension', async () => {
    const ext = vscode.extensions.getExtension('josenromero.easy-tailwindcss');
    const activate = ext?.isActive;
    assert.strictEqual(activate, true);
  });

  test('commands are registered in vscode', async () => {

    const registeredCommands = await vscode.commands.getCommands();
  
    const expectedCommands = [
      "easy-tailwindcss.askAPIkey",
      "easy-tailwindcss.removeAPIkey",
      "easy-tailwindcss.helpMeWithTailwindCss"
    ];

    for (const expectedCommand of expectedCommands ) {
      assert.notStrictEqual(
        registeredCommands.indexOf(expectedCommand),
        -1,
        `command ${expectedCommand} not registered and was expected`
      );
    }

  });

});
