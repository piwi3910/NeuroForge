import * as vscode from 'vscode';

import { DependencyAnalyzer } from '../services/dependencyAnalyzer';

interface DependencyNode {
  name: string;
  version: string;
  dependencies: DependencyNode[];
}

export class DependencyTreeProvider implements vscode.TreeDataProvider<DependencyTreeItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<DependencyTreeItem | undefined | null | void> =
    new vscode.EventEmitter<DependencyTreeItem | undefined | null | void>();

  readonly onDidChangeTreeData: vscode.Event<DependencyTreeItem | undefined | null | void> =
    this._onDidChangeTreeData.event;

  constructor(private readonly dependencyAnalyzer: DependencyAnalyzer) {}

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: DependencyTreeItem): vscode.TreeItem {
    return element;
  }

  async getChildren(element?: DependencyTreeItem): Promise<DependencyTreeItem[]> {
    if (!element) {
      // Root level - show all dependencies
      const dependencies = this.dependencyAnalyzer.getDependencies();
      return this.createDependencyItems(dependencies);
    }

    // Child level - show nested dependencies
    return this.createDependencyItems(element.node.dependencies);
  }

  private createDependencyItems(dependencies: DependencyNode[]): DependencyTreeItem[] {
    return dependencies.map(
      dep =>
        new DependencyTreeItem(
          dep,
          dep.dependencies.length > 0
            ? vscode.TreeItemCollapsibleState.Collapsed
            : vscode.TreeItemCollapsibleState.None
        )
    );
  }
}

class DependencyTreeItem extends vscode.TreeItem {
  constructor(
    public readonly node: DependencyNode,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(node.name, collapsibleState);
    this.tooltip = `${node.name}@${node.version}`;
    this.description = node.version;

    this.iconPath = new vscode.ThemeIcon('package');
    this.contextValue = 'dependency';

    this.command = {
      command: 'neuroforge.viewDependencyDetails',
      title: 'View Details',
      arguments: [node.name],
    };
  }
}
