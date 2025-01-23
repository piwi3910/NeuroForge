import * as vscode from 'vscode';

import { DependencyAnalyzer } from '../services/dependencyAnalyzer';

interface DependencyNode {
  name: string;
  version: string;
  description?: string;
  children: DependencyNode[];
}

class DependencyTreeItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly description?: string,
    public readonly children: DependencyTreeItem[] = []
  ) {
    super(label, collapsibleState);
    this.tooltip = description;
  }
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
    if (element) {
      return element.children;
    }

    const tree = await this.dependencyAnalyzer.getDependencyTree();
    return this.convertToTreeItems(tree);
  }

  private convertToTreeItems(nodes: DependencyNode[]): DependencyTreeItem[] {
    return nodes.map(node => {
      const hasChildren = node.children && node.children.length > 0;
      const label = `${node.name}@${node.version}`;
      const item = new DependencyTreeItem(
        label,
        hasChildren
          ? vscode.TreeItemCollapsibleState.Collapsed
          : vscode.TreeItemCollapsibleState.None,
        node.description,
        hasChildren ? this.convertToTreeItems(node.children) : []
      );

      // Add icons and context values
      item.iconPath = new vscode.ThemeIcon(node.name.includes('(dev)') ? 'tools' : 'package');
      item.contextValue = 'dependency';

      // Add command to show details when clicked
      item.command = {
        command: 'neuroforge.viewDependencyDetails',
        title: 'View Details',
        arguments: [node.name.replace(' (dev)', '')],
      };

      return item;
    });
  }

  async getParent(_element: DependencyTreeItem): Promise<DependencyTreeItem | null> {
    // Implement if you need to support 'reveal' functionality
    return null;
  }

  async getDependencyAnalysis(): Promise<string> {
    const analysis = await this.dependencyAnalyzer.analyzeDependencies();
    return `
Dependencies Analysis:
- Total Dependencies: ${analysis.total}
- Production Dependencies: ${analysis.production}
- Development Dependencies: ${analysis.development}
- Outdated Packages: ${analysis.outdated}
- Vulnerable Packages: ${analysis.vulnerable}
    `.trim();
  }
}
