// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "Odoo-sample-upgrade-extension" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('odoo.upgradeModule', async () => {
		// The code you place here will be executed every time your command is executed
// Ensure the workspace is correctly set


		const workspacePath = vscode.workspace.workspaceFolders?.[0].uri.fsPath ?? '';

		// Log the workspace path to verify correctness
		console.log('Workspace Path:', workspacePath);

		const addonsFolderPath = path.join(workspacePath,'workspace', 'addons-allnatura','addons');

		const moduleName = await vscode.window.showQuickPick(getModuleList(addonsFolderPath), {
            placeHolder: 'Select the Odoo module to upgrade'
        });

		if (!moduleName) {
            vscode.window.showErrorMessage('No module selected.');
            return;
        }
		// Display a message box to the user
		vscode.window.showInformationMessage('Odoo-sample-upgrade-extension !!!');
	});

	context.subscriptions.push(disposable);
}
async function getModuleList(addonsFolderPath: string): Promise<string[]> {
    const fs = vscode.workspace.fs;
    const dirEntries = await fs.readDirectory(vscode.Uri.file(addonsFolderPath));
    return dirEntries
        .filter(([name, type]) => type === vscode.FileType.Directory)
        .map(([name]) => name);
}
