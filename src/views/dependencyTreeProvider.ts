import * as vscode from 'vscode';
import { DependencyAnalyzer } from '../services/dependencyAnalyzer';

class DependencyNode extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly dependencies: string[] = [],
        public readonly contextValue?: string
    ) {
        super(label, collapsibleState);
    }
}

export class DependencyTreeProvider implements vscode.TreeDataProvider<DependencyNode> {
    private _onDidChangeTreeData: vscode.EventEmitter<DependencyNode | undefined | null | void> = new vscode.EventEmitter<DependencyNode | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<DependencyNode | undefined | null | void> = this._onDidChangeTreeData.event;

    private dependencyData: Map<string, string[]> = new Map();
    private cycles: string[][] = [];
    private unused: string[] = [];
    private missing: string[] = [];

    constructor(private readonly analyzer: DependencyAnalyzer) {}

    refresh(analysis: any): void {
        this.dependencyData.clear();
        this.cycles = analysis.cycles;
        this.unused = analysis.unused;
        this.missing = analysis.missing;

        for (const [path, node] of analysis.dependencies.entries()) {
            this.dependencyData.set(path, Array.from(node.dependencies));
        }

        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: DependencyNode): vscode.TreeItem {
        return element;
    }

    getChildren(element?: DependencyNode): Thenable<DependencyNode[]> {
        if (!element) {
            // Root level - show categories
            return Promise.resolve([
                new DependencyNode('Dependencies', vscode.TreeItemCollapsibleState.Expanded, [], 'dependencies'),
                new DependencyNode('Circular Dependencies', vscode.TreeItemCollapsibleState.Collapsed, [], 'cycles'),
                new DependencyNode('Unused Exports', vscode.TreeItemCollapsibleState.Collapsed, [], 'unused'),
                new DependencyNode('Missing Imports', vscode.TreeItemCollapsibleState.Collapsed, [], 'missing')
            ]);
        }

        switch (element.contextValue) {
            case 'dependencies':
                return Promise.resolve(
                    Array.from(this.dependencyData.entries()).map(([path, deps]) => 
                        new DependencyNode(
                            path.split('/').pop() || path,
                            deps.length > 0 ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None,
                            deps,
                            'file'
                        )
                    )
                );

            case 'cycles':
                return Promise.resolve(
                    this.cycles.map(cycle => 
                        new DependencyNode(
                            cycle.map(p => p.split('/').pop()).join(' → '),
                            vscode.TreeItemCollapsibleState.None,
                            [],
                            'cycle'
                        )
                    )
                );

            case 'unused':
                return Promise.resolve(
                    this.unused.map(file => 
                        new DependencyNode(
                            file.split('/').pop() || file,
                            vscode.TreeItemCollapsibleState.None,
                            [],
                            'unused'
                        )
                    )
                );

            case 'missing':
                return Promise.resolve(
                    this.missing.map(imp => 
                        new DependencyNode(
                            imp,
                            vscode.TreeItemCollapsibleState.None,
                            [],
                            'missing'
                        )
                    )
                );

            case 'file':
                return Promise.resolve(
                    element.dependencies.map(dep => 
                        new DependencyNode(
                            dep.split('/').pop() || dep,
                            vscode.TreeItemCollapsibleState.None,
                            [],
                            'dependency'
                        )
                    )
                );

            default:
                return Promise.resolve([]);
        }
    }

    getParent(element: DependencyNode): vscode.ProviderResult<DependencyNode> {
        return null;
    }
}