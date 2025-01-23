# NeuroForge

NeuroForge is an AI-powered coding assistant for Visual Studio Code that helps developers write, understand, and maintain code more efficiently.

## Features

### 1. Code Analysis
- **Explain Code** (⌘⇧E / Ctrl+Shift+E): Get detailed explanations of selected code blocks
- Smart code analysis with language-specific understanding
- Context-aware explanations that consider the surrounding code

### 2. Documentation Generation
- **Generate Documentation** (⌘⇧D / Ctrl+Shift+D): Automatically generate comprehensive documentation
- Supports multiple documentation styles (standard, detailed, minimal)
- Language-specific documentation formats (JSDoc, Python docstrings, JavaDoc)

### 3. Code Refactoring
- **Suggest Refactoring** (⌘⇧R / Ctrl+Shift+R): Get AI-powered refactoring suggestions
- Interactive refactoring preview
- One-click refactoring application
- Explanation of refactoring benefits

### 4. Test Generation
- **Generate Tests** (⌘⇧T / Ctrl+Shift+T): Automatically generate test cases
- Support for multiple testing frameworks:
  - JavaScript/TypeScript: Jest, Mocha
  - Python: pytest, unittest
  - Java: JUnit, TestNG
- Test file organization in `__tests__` directory

## Quick Access
- Use the NeuroForge status bar icon (🧠) to access all features
- Open command palette (⌘⇧P / Ctrl+Shift+P) and type "NeuroForge"
- Right-click context menu under "NeuroForge"
- Quick menu shortcut (⌘⇧Space / Ctrl+Shift+Space)

## Installation

1. Open VS Code
2. Press `Ctrl+P` / `⌘P` to open the Quick Open dialog
3. Type `ext install neuroforge`
4. Click Install

## Extension Settings

This extension contributes the following settings:

* `neuroforge.aiModel`: Select AI model type (default, fast, accurate)
* `neuroforge.maxTokens`: Maximum tokens for AI requests
* `neuroforge.language`: Primary programming language
* `neuroforge.autoSuggest`: Enable/disable automatic suggestions
* `neuroforge.documentationStyle`: Documentation style preference
* `neuroforge.testFramework`: Configure preferred test frameworks per language

## Keyboard Shortcuts

| Feature | Windows/Linux | macOS |
|---------|--------------|-------|
| Explain Code | Ctrl+Shift+E | ⌘⇧E |
| Generate Documentation | Ctrl+Shift+D | ⌘⇧D |
| Suggest Refactoring | Ctrl+Shift+R | ⌘⇧R |
| Generate Tests | Ctrl+Shift+T | ⌘⇧T |
| Quick Menu | Ctrl+Shift+Space | ⌘⇧Space |

## Requirements

- Visual Studio Code version 1.96.0 or higher
- Active internet connection for AI features

## Usage Examples

### Code Explanation
1. Select code you want to understand
2. Use ⌘⇧E / Ctrl+Shift+E or right-click
3. View detailed explanation in new editor

### Documentation Generation
1. Select function/class to document
2. Use ⌘⇧D / Ctrl+Shift+D
3. Documentation is automatically inserted

### Refactoring Suggestions
1. Select code to refactor
2. Use ⌘⇧R / Ctrl+Shift+R
3. Review suggestions in interactive preview
4. Apply selected refactoring

### Test Generation
1. Select code to test
2. Use ⌘⇧T / Ctrl+Shift+T
3. Tests are generated in `__tests__` directory

## Known Issues

- Initial release, gathering feedback
- Some language-specific features may be limited

## Release Notes

### 0.0.1

Initial release of NeuroForge:
- Code explanation functionality
- Documentation generation
- Refactoring suggestions
- Test case generation
- Multi-language support
- Interactive UI

## Contributing

We welcome contributions! Please see our [contributing guidelines](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any problems or have suggestions, please [file an issue](https://github.com/yourusername/neuroforge/issues).

---

**Enjoy coding with NeuroForge! 🧠⚡**
