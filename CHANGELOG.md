# Change Log

All notable changes to the "NeuroForge" extension will be documented in this file.

## [0.0.3] - 2025-01-27

### Added

- Streaming responses in chat view
  - Real-time display of AI responses
  - Improved responsiveness and user experience
  - Token usage tracking in streams
  - Proper error handling for streams
- Dynamic model loading from APIs
  - Automatic model discovery from providers
  - Better context length detection
  - Improved model sorting and display

### Fixed

- Provider initialization and error handling
  - Better handling of missing API keys
  - Improved settings validation
  - Better error messages and prompts

## [0.0.2] - 2025-01-27

### Fixed

- Improved provider initialization and error handling
  - Return default models when API key is not configured
  - Move default models to separate method
  - Add better error handling for API calls

### Added

- Support for latest AI models
  - Claude 3 Opus and Sonnet
  - GPT-4 Turbo
- Improved configuration validation
  - Added validation rules for numeric settings
  - Added model-specific validations
  - Added better error messages

## [0.0.1] - 2025-01-23

### Added

- Initial release of NeuroForge
- Core features:
  - Code explanation with AI-powered analysis
  - Documentation generation with language-specific formatting
  - Refactoring suggestions with interactive preview
  - Test case generation with multi-framework support
  - Intelligent code completion
- User Interface:
  - Status bar integration with quick access menu
  - Context menu integration
  - Keyboard shortcuts for all features
  - Interactive webview for refactoring suggestions
- Configuration:
  - AI model selection (default, fast, accurate)
  - Language-specific settings
  - Documentation style preferences
  - Test framework configurations
- Multi-language support:
  - JavaScript/TypeScript
  - Python
  - Java
  - C++
  - C#
- Telemetry:
  - Basic usage tracking
  - Error reporting
  - Feature popularity metrics

### Technical Improvements

- Modular architecture with separate services
- Extensible command system
- Configurable AI service integration
- Comprehensive telemetry system
- Language-specific formatting
- Test framework integration

### Documentation

- Comprehensive README
- Architecture documentation
- API documentation
- Usage examples
- Configuration guide
