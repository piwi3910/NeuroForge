import * as vscode from 'vscode';
import { DependencyAnalyzer } from '../services/dependencyAnalyzer';
import { CacheService } from '../services/cacheService';

export class AnalyzeDependenciesCommand {
    private readonly dependencyAnalyzer: DependencyAnalyzer;

    constructor(cacheService: CacheService) {
        this.dependencyAnalyzer = new DependencyAnalyzer(cacheService);
    }

    /**
     * Registers the analyze dependencies command
     * @param context The extension context
     */
    public register(context: vscode.ExtensionContext): void {
        const disposable = vscode.commands.registerCommand('neuroforge.analyzeDependencies', async () => {
            await this.execute();
        });
        context.subscriptions.push(disposable);
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
                await this.showAnalysisResults(analysis);
            });
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to analyze dependencies: ${error}`);
        }
    }

    /**
     * Shows the dependency analysis results
     * @param analysis Analysis results
     */
    private async showAnalysisResults(analysis: any): Promise<void> {
        const panel = vscode.window.createWebviewPanel(
            'dependencyAnalysis',
            'Dependency Analysis',
            vscode.ViewColumn.One,
            {
                enableScripts: true
            }
        );

        const graph = this.dependencyAnalyzer.generateDependencyGraph(analysis.dependencies);
        const issues = this.formatIssues(analysis);

        panel.webview.html = this.getWebviewContent(graph, issues);
    }

    /**
     * Formats analysis issues for display
     * @param analysis Analysis results
     * @returns Formatted issues
     */
    private formatIssues(analysis: any): string {
        let issues = '';

        if (analysis.cycles.length > 0) {
            issues += '<h3>🔄 Circular Dependencies</h3><ul>';
            analysis.cycles.forEach((cycle: string[]) => {
                issues += `<li>${cycle.join(' → ')}</li>`;
            });
            issues += '</ul>';
        }

        if (analysis.unused.length > 0) {
            issues += '<h3>⚠️ Unused Exports</h3><ul>';
            analysis.unused.forEach((file: string) => {
                issues += `<li>${file}</li>`;
            });
            issues += '</ul>';
        }

        if (analysis.missing.length > 0) {
            issues += '<h3>❌ Missing Imports</h3><ul>';
            analysis.missing.forEach((imp: string) => {
                issues += `<li>${imp}</li>`;
            });
            issues += '</ul>';
        }

        return issues;
    }

    /**
     * Generates the webview HTML content
     * @param graph Dependency graph DOT format
     * @param issues Formatted issues
     * @returns HTML content
     */
    private getWebviewContent(graph: string, issues: string): string {
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Dependency Analysis</title>
            <script src="https://d3js.org/d3.v7.min.js"></script>
            <script src="https://unpkg.com/@hpcc-js/wasm@1.12.8/dist/index.min.js"></script>
            <script src="https://unpkg.com/d3-graphviz@4.0.0/build/d3-graphviz.js"></script>
            <style>
                body {
                    font-family: var(--vscode-font-family);
                    padding: 20px;
                    display: grid;
                    grid-template-columns: 2fr 1fr;
                    gap: 20px;
                }
                #graph {
                    border: 1px solid var(--vscode-panel-border);
                    border-radius: 5px;
                    padding: 10px;
                    height: 600px;
                }
                #issues {
                    border: 1px solid var(--vscode-panel-border);
                    border-radius: 5px;
                    padding: 20px;
                    overflow-y: auto;
                    height: 600px;
                }
                h2, h3 {
                    color: var(--vscode-editor-foreground);
                }
                ul {
                    padding-left: 20px;
                }
                li {
                    margin-bottom: 5px;
                }
            </style>
        </head>
        <body>
            <div>
                <h2>Dependency Graph</h2>
                <div id="graph"></div>
            </div>
            <div>
                <h2>Analysis Results</h2>
                <div id="issues">
                    ${issues || 'No issues found'}
                </div>
            </div>
            <script>
                const graphviz = d3.select("#graph").graphviz()
                    .zoom(true)
                    .fit(true);
                
                const dotSource = \`${graph}\`;
                graphviz.renderDot(dotSource);
            </script>
        </body>
        </html>`;
    }
}