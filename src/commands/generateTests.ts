import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { LanguageService } from '../services/languageService';
import { AIService } from '../services/aiService';

interface TestFramework {
    name: string;
    fileExtension: string;
    importStatements: string;
    testFilePattern: string;
}

export class GenerateTestsCommand {
    private readonly languageService: LanguageService;
    private readonly aiService: AIService;
    private readonly testFrameworks: Map<string, TestFramework>;

    constructor(languageService: LanguageService, aiService: AIService) {
        this.languageService = languageService;
        this.aiService = aiService;
        this.testFrameworks = new Map([
            ['typescript', {
                name: 'Jest',
                fileExtension: '.test.ts',
                importStatements: 'import { describe, expect, test } from \'@jest/globals\';',
                testFilePattern: '${filename}.test.ts'
            }],
            ['javascript', {
                name: 'Jest',
                fileExtension: '.test.js',
                importStatements: 'const { describe, expect, test } = require(\'@jest/globals\');',
                testFilePattern: '${filename}.test.js'
            }],
            ['python', {
                name: 'pytest',
                fileExtension: '_test.py',
                importStatements: 'import pytest',
                testFilePattern: 'test_${filename}.py'
            }],
            ['java', {
                name: 'JUnit',
                fileExtension: 'Test.java',
                importStatements: 'import org.junit.Test;\nimport static org.junit.Assert.*;',
                testFilePattern: '${filename}Test.java'
            }]
        ]);
    }

    /**
     * Registers the generate tests command
     * @param context The extension context
     */
    public register(context: vscode.ExtensionContext): void {
        const disposable = vscode.commands.registerCommand('neuroforge.generateTests', async () => {
            await this.execute();
        });
        context.subscriptions.push(disposable);
    }

    /**
     * Executes the generate tests command
     */
    private async execute(): Promise<void> {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showWarningMessage('Please open a file to generate tests.');
            return;
        }

        const selection = editor.selection;
        const code = selection.isEmpty 
            ? editor.document.getText() 
            : editor.document.getText(selection);

        if (!code.trim()) {
            vscode.window.showWarningMessage('No code selected to generate tests for.');
            return;
        }

        try {
            await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: "Generating tests...",
                cancellable: false
            }, async (progress) => {
                // Analyze code structure
                progress.report({ message: 'Analyzing code structure...' });
                const analysis = await this.languageService.analyzeCode(code);

                // Generate test cases
                progress.report({ message: 'Generating test cases...' });
                const testCases = await this.generateTestCases(code, analysis);

                // Create test file
                progress.report({ message: 'Creating test file...' });
                await this.createTestFile(editor.document.uri, testCases);

                vscode.window.showInformationMessage('Test cases generated successfully!');
            });
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to generate tests: ${error}`);
        }
    }

    /**
     * Generates test cases for the given code
     * @param code Source code to test
     * @param analysis Code analysis results
     * @returns Generated test cases
     */
    private async generateTestCases(code: string, analysis: any): Promise<string> {
        const languageId = vscode.window.activeTextEditor?.document.languageId || 'javascript';
        const framework = this.testFrameworks.get(languageId) || this.testFrameworks.get('javascript')!;

        const testTemplate = await this.aiService.generateTestCases(code, {
            ...analysis,
            framework: framework.name
        });

        return `${framework.importStatements}\n\n${testTemplate}`;
    }

    /**
     * Creates a test file with the generated test cases
     * @param sourceUri Source file URI
     * @param testContent Generated test content
     */
    private async createTestFile(sourceUri: vscode.Uri, testContent: string): Promise<void> {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        const languageId = editor.document.languageId;
        const framework = this.testFrameworks.get(languageId) || this.testFrameworks.get('javascript')!;

        // Determine test file path
        const sourceFile = path.parse(sourceUri.fsPath);
        const testFileName = framework.testFilePattern.replace('${filename}', sourceFile.name);
        const testFilePath = path.join(sourceFile.dir, '__tests__', testFileName);

        // Create __tests__ directory if it doesn't exist
        const testDir = path.join(sourceFile.dir, '__tests__');
        if (!fs.existsSync(testDir)) {
            fs.mkdirSync(testDir, { recursive: true });
        }

        // Create and show the test file
        const testFileUri = vscode.Uri.file(testFilePath);
        const workspaceEdit = new vscode.WorkspaceEdit();
        
        try {
            await vscode.workspace.fs.stat(testFileUri);
            // File exists, ask for confirmation to overwrite
            const overwrite = await vscode.window.showWarningMessage(
                'Test file already exists. Do you want to overwrite it?',
                'Yes',
                'No'
            );
            if (overwrite !== 'Yes') {
                return;
            }
        } catch {
            // File doesn't exist, continue
        }

        workspaceEdit.createFile(testFileUri, { overwrite: true });
        workspaceEdit.insert(testFileUri, new vscode.Position(0, 0), testContent);
        
        await vscode.workspace.applyEdit(workspaceEdit);
        const doc = await vscode.workspace.openTextDocument(testFileUri);
        await vscode.window.showTextDocument(doc, { viewColumn: vscode.ViewColumn.Beside });
    }

    /**
     * Updates the AIService with test generation preferences
     * @param settings Test generation settings
     */
    private async updateTestSettings(settings: Record<string, any>): Promise<void> {
        await this.aiService.updateSettings({
            testFramework: settings.framework,
            testStyle: settings.style,
            coverage: settings.coverage
        });
    }
}