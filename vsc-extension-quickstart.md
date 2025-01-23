# Welcome to NeuroForge Development

## What's in the folder

- This folder contains all of the files necessary for your extension.
- `package.json` - this is the manifest file in which you declare your extension and command registrations.
- `src/extension.ts` - this is the main file where you will provide the implementation of your commands.
- The `src` folder contains all the source files for the extension.
- The `media` folder contains CSS and JavaScript files for the webview.
- The `resources` folder contains static resources used by the extension.

## Get up and running straight away

- Press `F5` to open a new window with your extension loaded.
- Open the Command Palette (Ctrl+Shift+P) and type 'NeuroForge' to see available commands.
- Set breakpoints in your code inside `src/extension.ts` to debug your extension.
- Find output from your extension in the debug console.

## Make changes

- You can relaunch the extension from the debug toolbar after changing code in `src/extension.ts`.
- You can also reload (`Ctrl+R` or `Cmd+R` on Mac) the VS Code window with your extension to load your changes.

## Explore the API

- You can open the full set of our API when you open the file `node_modules/@types/vscode/index.d.ts`.

## Run tests

- Open the debug viewlet (`Ctrl+Shift+D` or `Cmd+Shift+D` on Mac) and from the launch configuration dropdown pick `Extension Tests`.
- Press `F5` to run the tests in a new window with your extension loaded.
- See the output of the test result in the debug console.
- Make changes to `src/test/suite/extension.test.ts` or create new test files inside the `test/suite` folder.
  - The provided test runner will only consider files matching the name pattern `**.test.ts`.
  - You can create folders inside the `test` folder to structure your tests any way you want.

## Go further

- [Follow best practices for VS Code extension development](https://code.visualstudio.com/api/references/extension-guidelines)
- [Publish your extension](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [Set up continuous integration](https://code.visualstudio.com/api/working-with-extensions/continuous-integration)

## Bundling your extension

- To bundle your extension, install the recommended bundler: `npm install -g @vscode/vsce`
- Package the extension: `vsce package`
- The packaged extension will be created in the root directory with a `.vsix` extension.

## Publishing your extension

- Create a publisher on https://marketplace.visualstudio.com/manage
- `vsce login <publisher>`
- `vsce publish`

## Working with Webview

- The chat interface is implemented using VS Code's Webview API
- Webview files are in the `media` folder
- Use `asWebviewUri` to properly load resources in the webview
- Follow VS Code's [Webview Security Best Practices](https://code.visualstudio.com/api/extension-guides/webview#security)
