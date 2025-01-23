import * as fs from 'fs';
import * as path from 'path';

import * as vscode from 'vscode';

interface Dependency {
  name: string;
  version: string;
  description?: string;
  dependencies?: { [key: string]: string };
  devDependencies?: { [key: string]: string };
}

interface DependencyNode {
  name: string;
  version: string;
  description?: string;
  children: DependencyNode[];
}

interface NpmRegistryResponse {
  version: string;
  description?: string;
  dependencies?: { [key: string]: string };
  devDependencies?: { [key: string]: string };
}

export class DependencyAnalyzer {
  private readonly packageJsonPaths: string[] = [];

  constructor() {
    this.findPackageJsonFiles();
  }

  private findPackageJsonFiles(): void {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) return;

    for (const folder of workspaceFolders) {
      const packageJsonPath = path.join(folder.uri.fsPath, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        this.packageJsonPaths.push(packageJsonPath);
      }
    }
  }

  public async getDependencyTree(): Promise<DependencyNode[]> {
    const tree: DependencyNode[] = [];

    for (const packageJsonPath of this.packageJsonPaths) {
      try {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        const dependencies = packageJson.dependencies || {};
        const devDependencies = packageJson.devDependencies || {};

        // Add production dependencies
        for (const [name, version] of Object.entries(dependencies)) {
          tree.push(await this.buildDependencyNode(name, version as string));
        }

        // Add development dependencies
        for (const [name, version] of Object.entries(devDependencies)) {
          const node = await this.buildDependencyNode(name, version as string);
          node.name = `${node.name} (dev)`;
          tree.push(node);
        }
      } catch (error) {
        console.error(`Error parsing package.json at ${packageJsonPath}:`, error);
      }
    }

    return tree;
  }

  private async buildDependencyNode(name: string, version: string): Promise<DependencyNode> {
    const node: DependencyNode = {
      name,
      version: version.replace(/[\^~]/, ''),
      children: [],
    };

    try {
      const details = await this.getDependencyDetails(name);
      if (details) {
        node.description = details.description;

        // Add nested dependencies
        if (details.dependencies) {
          for (const [depName, depVersion] of Object.entries(details.dependencies)) {
            node.children.push({
              name: depName,
              version: depVersion.replace(/[\^~]/, ''),
              children: [],
            });
          }
        }
      }
    } catch (error) {
      console.error(`Error getting details for ${name}:`, error);
    }

    return node;
  }

  public async getDependencyDetails(name: string): Promise<Dependency | null> {
    try {
      // First try to get from local node_modules
      const localPath = path.join(
        path.dirname(this.packageJsonPaths[0]),
        'node_modules',
        name,
        'package.json'
      );

      if (fs.existsSync(localPath)) {
        const packageJson = JSON.parse(fs.readFileSync(localPath, 'utf8'));
        return {
          name,
          version: packageJson.version,
          description: packageJson.description,
          dependencies: packageJson.dependencies,
          devDependencies: packageJson.devDependencies,
        };
      }

      // If not found locally, fetch from npm registry
      const response = await fetch(`https://registry.npmjs.org/${name}/latest`);
      if (!response.ok) {
        throw new Error(`Failed to fetch package info: ${response.statusText}`);
      }

      const data = (await response.json()) as NpmRegistryResponse;
      return {
        name,
        version: data.version,
        description: data.description,
        dependencies: data.dependencies,
        devDependencies: data.devDependencies,
      };
    } catch (error) {
      console.error(`Error getting dependency details for ${name}:`, error);
      return null;
    }
  }

  public async analyzeDependencies(): Promise<{
    total: number;
    production: number;
    development: number;
    outdated: number;
    vulnerable: number;
  }> {
    let total = 0;
    let production = 0;
    let development = 0;
    let outdated = 0;
    let vulnerable = 0;

    for (const packageJsonPath of this.packageJsonPaths) {
      try {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        const dependencies = packageJson.dependencies || {};
        const devDependencies = packageJson.devDependencies || {};

        production += Object.keys(dependencies).length;
        development += Object.keys(devDependencies).length;
        total = production + development;

        // Check for outdated packages
        const allDeps = { ...dependencies, ...devDependencies };
        for (const [name, version] of Object.entries(allDeps)) {
          const details = await this.getDependencyDetails(name);
          if (details && details.version !== (version as string).replace(/[\^~]/, '')) {
            outdated++;
          }
        }

        // TODO: Implement vulnerability check using npm audit
        // For now, this is a placeholder
        vulnerable = 0;
      } catch (error) {
        console.error(`Error analyzing dependencies in ${packageJsonPath}:`, error);
      }
    }

    return {
      total,
      production,
      development,
      outdated,
      vulnerable,
    };
  }
}
