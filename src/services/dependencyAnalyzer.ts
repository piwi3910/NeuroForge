import * as vscode from 'vscode';

interface DependencyNode {
  name: string;
  version: string;
  dependencies: DependencyNode[];
}

interface DependencyDetails {
  name: string;
  version: string;
  description: string;
}

export class DependencyAnalyzer {
  private dependencyTree: DependencyNode | null = null;

  constructor() {
    void this.initializeTree();
  }

  private async initializeTree(): Promise<void> {
    try {
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders) {
        return;
      }

      const packageJsonUri = vscode.Uri.joinPath(workspaceFolders[0].uri, 'package.json');
      const packageJsonContent = await vscode.workspace.fs.readFile(packageJsonUri);
      const packageJson = JSON.parse(packageJsonContent.toString()) as PackageJson;

      this.dependencyTree = await this.buildDependencyTree(packageJson);
    } catch (error) {
      void vscode.window.showErrorMessage(`Failed to initialize dependency tree: ${error}`);
    }
  }

  private async buildDependencyTree(packageJson: PackageJson): Promise<DependencyNode> {
    const dependencies = packageJson.dependencies || {};
    const devDependencies = packageJson.devDependencies || {};
    const allDependencies = { ...dependencies, ...devDependencies };

    const root: DependencyNode = {
      name: packageJson.name || 'root',
      version: packageJson.version || '0.0.0',
      dependencies: [],
    };

    for (const [name, version] of Object.entries(allDependencies)) {
      root.dependencies.push({
        name,
        version: version as string,
        dependencies: [],
      });
    }

    return root;
  }

  public async getDependencyDetails(dependencyName: string): Promise<DependencyDetails> {
    try {
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders) {
        throw new Error('No workspace folder found');
      }

      const nodeModulesPath = vscode.Uri.joinPath(
        workspaceFolders[0].uri,
        'node_modules',
        dependencyName,
        'package.json'
      );

      const packageJsonContent = await vscode.workspace.fs.readFile(nodeModulesPath);
      const packageJson = JSON.parse(packageJsonContent.toString()) as PackageJson;

      return {
        name: packageJson.name || dependencyName,
        version: packageJson.version || 'unknown',
        description: packageJson.description || 'No description available',
      };
    } catch (error) {
      throw new Error(`Failed to get dependency details: ${error}`);
    }
  }

  public getDependencies(): DependencyNode[] {
    return this.dependencyTree?.dependencies || [];
  }

  public async refresh(): Promise<void> {
    await this.initializeTree();
  }

  public async searchDependencies(searchText: string): Promise<DependencyNode[]> {
    const allDependencies = this.getDependencies();
    return allDependencies.filter(dep => dep.name.toLowerCase().includes(searchText.toLowerCase()));
  }
}

interface PackageJson {
  name?: string;
  version?: string;
  description?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}
