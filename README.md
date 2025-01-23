# NeuroForge

NeuroForge is an AI-powered coding assistant for Visual Studio Code that helps developers write, understand, and maintain code more efficiently.

## Features

### Code Analysis
- **Explain Code** (⌘⇧E / Ctrl+Shift+E): Get detailed explanations of selected code blocks
- Smart code analysis with language-specific understanding
- Context-aware explanations that consider the surrounding code

## Installation

1. Open VS Code
2. Press `Ctrl+P` / `⌘P` to open the Quick Open dialog
3. Type `ext install neuroforge`
4. Click Install

## Usage

### Explaining Code
1. Select the code you want to understand
2. Either:
   - Press `Ctrl+Shift+E` (`⌘⇧E` on macOS)
   - Right-click and select "NeuroForge: Explain Code"
   - Click the NeuroForge icon in the status bar
   - Open the command palette (`Ctrl+Shift+P` / `⌘⇧P`) and type "NeuroForge: Explain Code"

The explanation will open in a new editor tab beside your code.

## Extension Settings

This extension contributes the following settings:

* `neuroforge.aiModel`: AI model to use for code analysis and generation
* `neuroforge.maxTokens`: Maximum number of tokens to use in AI requests
* `neuroforge.language`: Primary programming language for code analysis
* `neuroforge.autoSuggest`: Enable/disable automatic code suggestions

## Requirements

- Visual Studio Code version 1.96.0 or higher
- Active internet connection for AI features

## Known Issues

- Initial release, gathering feedback

## Release Notes

### 0.0.1

Initial release of NeuroForge:
- Basic code explanation functionality
- Language detection
- Context-aware analysis

## Contributing

We welcome contributions! Please see our [contributing guidelines](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any problems or have suggestions, please [file an issue](https://github.com/yourusername/neuroforge/issues).

---

**Enjoy coding with NeuroForge! 🧠⚡**
