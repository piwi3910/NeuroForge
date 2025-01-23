import * as vscode from 'vscode';
import { DependencyAnalyzer } from '../services/dependencyAnalyzer';
import { CacheService } from '../services/cacheService';
import { DependencyTreeProvider } from '../views/dependencyTreeProvider';

export class AnalyzeDependenciesCommand {
    private readonly dependencyAnalyzer: DependencyAnalyzer;
    private readonly treeProvider: DependencyTreeProvider;
    private treeView: vscode.TreeView<any>;

    constructor(cacheService: CacheService) {
        this.dependencyAnalyzer = new DependencyAnalyzer(cacheService);
        this.treeProvider = new DependencyTreeProvider(this.dependencyAnalyzer);
        this.treeView = vscode.window.createTreeView('neuroForgeDependencies', {
            treeDataProvider: this.treeProvider,
            showCollapseAll: true
        });
    }

    /**
     * Registers the analyze dependencies command
     * @param context The extension context
     */
    public register(context: vscode.ExtensionContext): void {
        // Register the main command
        const analyzeCommand = vscode.commands.registerCommand('neuroforge.analyzeDependencies', async () => {
            await this.execute();
        });

        // Register the tree view
        const treeViewDisposable = this.treeView;

        // Register click handlers for tree items
        const openFileCommand = vscode.commands.registerCommand('neuroforge.openDependencyFile', (filePath: string) => {
            this.openFile(filePath);
        });

        const showDependencyDetailsCommand = vscode.commands.registerCommand('neuroforge.showDependencyDetails', (filePath: string) => {
            this.showDependencyDetails(filePath);
        });

        context.subscriptions.push(
            analyzeCommand,
            treeViewDisposable,
            openFileCommand,
            showDependencyDetailsCommand
        );
    }

    /**
     * Executes the analyze dependencies command
     */
    private async execute(): Promise<void> {
        try {
            await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: "Analyzing project dependencies...",
                cancellable: false
            }, async (progress) => {
                const analysis = await this.dependencyAnalyzer.analyzeDependencies(progress);
                
                // Update tree view with analysis results
                this.treeProvider.refresh(analysis);
                
                // Show the dependencies view
                await vscode.commands.executeCommand('neuroForgeDependencies.focus');

                // Show summary in status bar
                const issues = analysis.cycles.length + analysis.unused.length + analysis.missing.length;
                if (issues > 0) {
                    vscode.window.showWarningMessage(
                        `Found ${issues} dependency issues: ` +
                        `${analysis.cycles.length} cycles, ` +
                        `${analysis.unused.length} unused exports, ` +
                        `${analysis.missing.length} missing imports`
                    );
                } else {
                    vscode.window.showInformationMessage('No dependency issues found.');
                }
            });
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to analyze dependencies: ${error}`);
        }
    }

    /**
     * Opens a file in the editor
     * @param filePath File path to open
     */
    private async openFile(filePath: string): Promise<void> {
        try {
            const document = await vscode.workspace.openTextDocument(filePath);
            await vscode.window.showTextDocument(document);
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to open file: ${error}`);
        }
    }

    /**
     * Shows dependency details in a diff view
     * @param filePath File to show dependencies for
     */
    private async showDependencyDetails(filePath: string): Promise<void> {
        try {
            const analysis = await this.dependencyAnalyzer.analyzeDependencies();
            const node = analysis.dependencies.get(filePath);

            if (!node) {
                return;
            }

            // Create details document
            const details = [
                `Dependencies for: ${filePath}`,
                '='.repeat(40),
                '',
                'Imports:',
                ...node.imports.map(imp => `  - ${imp}`),
                '',
                'Exports:',
                ...node.exports.map(exp => `  - ${exp}`),
                '',
                'Dependencies:',
                ...Array.from(node.dependencies).map(dep => `  - ${dep}`),
                '',
                'Dependents:',
                ...Array.from(node.dependents).map(dep => `  - ${dep}`)
            ].join('\n');

            // Show in diff editor
            const originalUri = vscode.Uri.file(filePath);
            const detailsUri = originalUri.with({ scheme: 'untitled', path: `${filePath}.dependencies` });

            const detailsDoc = await vscode.workspace.openTextDocument(detailsUri);
            const edit = new vscode.WorkspaceEdit();
            edit.insert(detailsUri, new vscode.Position(0, 0), details);
            await vscode.workspace.applyEdit(edit);

            await vscode.commands.executeCommand('vscode.diff',
                originalUri,
                detailsUri,
                `Dependency Analysis: ${filePath.split('/').pop()}`
            );
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to show dependency details: ${error}`);
        }
    }
}