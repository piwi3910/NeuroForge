import * as vscode from 'vscode';
import * as path from 'path';
import { CacheService } from './cacheService';

interface DependencyNode {
    path: string;
    imports: string[];
    exports: string[];
    dependencies: Set<string>;
    dependents: Set<string>;
}

interface AnalysisResult {
    dependencies: Map<string, DependencyNode>;
    cycles: string[][];
    unused: string[];
    missing: string[];
}

export class DependencyAnalyzer {
    private readonly cache: CacheService;

    constructor(cache: CacheService) {
        this.cache = cache;
    }

    /**
     * Analyzes dependencies in the workspace
     * @param progress Progress reporter
     * @returns Analysis results
     */
    public async analyzeDependencies(
        progress?: vscode.Progress<{ message?: string; increment?: number }>
    ): Promise<AnalysisResult> {
        const cached = this.cache.get<AnalysisResult>('dependency-analysis', {});
        if (cached) {
            return cached;
        }

        const dependencies = new Map<string, DependencyNode>();
        const cycles: string[][] = [];
        const unused: string[] = [];
        const missing: string[] = [];

        try {
            // Find all source files
            progress?.report({ message: 'Finding source files...' });
            const files = await vscode.workspace.findFiles(
                '{**/*.ts,**/*.js,**/*.tsx,**/*.jsx}',
                '**/node_modules/**'
            );

            // Parse each file
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                progress?.report({
                    message: `Analyzing file ${i + 1}/${files.length}...`,
                    increment: (100 / files.length)
                });

                const node = await this.analyzeFile(file);
                if (node) {
                    dependencies.set(file.fsPath, node);
                }
            }

            // Build dependency graph
            progress?.report({ message: 'Building dependency graph...' });
            await this.buildDependencyGraph(dependencies);

            // Find cycles
            progress?.report({ message: 'Detecting cycles...' });
            this.detectCycles(dependencies, cycles);

            // Find unused exports
            progress?.report({ message: 'Finding unused exports...' });
            this.findUnusedExports(dependencies, unused);

            // Find missing imports
            progress?.report({ message: 'Finding missing imports...' });
            await this.findMissingImports(dependencies, missing);

            const result: AnalysisResult = {
                dependencies,
                cycles,
                unused,
                missing
            };

            // Cache the results
            this.cache.set('dependency-analysis', {}, result);

            return result;
        } catch (error) {
            console.error('Error analyzing dependencies:', error);
            throw error;
        }
    }

    /**
     * Analyzes a single file for dependencies
     * @param file File URI
     * @returns Dependency node
     */
    private async analyzeFile(file: vscode.Uri): Promise<DependencyNode | null> {
        try {
            const content = (await vscode.workspace.fs.readFile(file)).toString();
            const imports = this.extractImports(content);
            const exports = this.extractExports(content);

            return {
                path: file.fsPath,
                imports,
                exports,
                dependencies: new Set(),
                dependents: new Set()
            };
        } catch (error) {
            console.error(`Error analyzing file ${file.fsPath}:`, error);
            return null;
        }
    }

    /**
     * Extracts import statements from code
     * @param content File content
     * @returns Array of import paths
     */
    private extractImports(content: string): string[] {
        const imports: string[] = [];
        const importRegex = /import\s+(?:{[^}]*}|\*\s+as\s+\w+|\w+)\s+from\s+['"]([^'"]+)['"]/g;
        const requireRegex = /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g;

        let match;
        while ((match = importRegex.exec(content)) !== null) {
            imports.push(match[1]);
        }
        while ((match = requireRegex.exec(content)) !== null) {
            imports.push(match[1]);
        }

        return imports;
    }

    /**
     * Extracts export statements from code
     * @param content File content
     * @returns Array of exported names
     */
    private extractExports(content: string): string[] {
        const exports: string[] = [];
        const exportRegex = /export\s+(?:default\s+)?(?:class|function|const|let|var)\s+(\w+)/g;
        const namedExportRegex = /export\s*{([^}]+)}/g;

        let match;
        while ((match = exportRegex.exec(content)) !== null) {
            exports.push(match[1]);
        }
        while ((match = namedExportRegex.exec(content)) !== null) {
            const names = match[1].split(',').map(name => name.trim().split(' as ')[0]);
            exports.push(...names);
        }

        return exports;
    }

    /**
     * Builds the dependency graph
     * @param dependencies Map of dependency nodes
     */
    private async buildDependencyGraph(dependencies: Map<string, DependencyNode>): Promise<void> {
        for (const [filePath, node] of dependencies.entries()) {
            for (const importPath of node.imports) {
                const resolvedPath = await this.resolvePath(filePath, importPath);
                if (resolvedPath && dependencies.has(resolvedPath)) {
                    node.dependencies.add(resolvedPath);
                    dependencies.get(resolvedPath)?.dependents.add(filePath);
                }
            }
        }
    }

    /**
     * Resolves an import path to an absolute file path
     * @param fromPath Source file path
     * @param importPath Import path
     * @returns Resolved absolute path
     */
    private async resolvePath(fromPath: string, importPath: string): Promise<string | null> {
        if (importPath.startsWith('.')) {
            const dirPath = path.dirname(fromPath);
            const resolvedPath = path.resolve(dirPath, importPath);
            
            // Try common extensions
            const extensions = ['.ts', '.tsx', '.js', '.jsx', '/index.ts', '/index.js'];
            for (const ext of extensions) {
                const fullPath = resolvedPath + ext;
                try {
                    await vscode.workspace.fs.stat(vscode.Uri.file(fullPath));
                    return fullPath;
                } catch {
                    continue;
                }
            }
        }
        return null;
    }

    /**
     * Detects cycles in the dependency graph
     * @param dependencies Map of dependency nodes
     * @param cycles Array to store detected cycles
     */
    private detectCycles(dependencies: Map<string, DependencyNode>, cycles: string[][]): void {
        const visited = new Set<string>();
        const recursionStack = new Set<string>();

        const dfs = (node: DependencyNode, path: string[] = []): void => {
            const nodePath = node.path;
            
            if (recursionStack.has(nodePath)) {
                const cycleStart = path.indexOf(nodePath);
                if (cycleStart !== -1) {
                    cycles.push(path.slice(cycleStart));
                }
                return;
            }

            if (visited.has(nodePath)) {
                return;
            }

            visited.add(nodePath);
            recursionStack.add(nodePath);
            path.push(nodePath);

            for (const depPath of node.dependencies) {
                const depNode = dependencies.get(depPath);
                if (depNode) {
                    dfs(depNode, [...path]);
                }
            }

            recursionStack.delete(nodePath);
            path.pop();
        };

        for (const node of dependencies.values()) {
            if (!visited.has(node.path)) {
                dfs(node);
            }
        }
    }

    /**
     * Finds unused exports in the codebase
     * @param dependencies Map of dependency nodes
     * @param unused Array to store unused exports
     */
    private findUnusedExports(dependencies: Map<string, DependencyNode>, unused: string[]): void {
        for (const node of dependencies.values()) {
            if (node.exports.length > 0 && node.dependents.size === 0) {
                unused.push(node.path);
            }
        }
    }

    /**
     * Finds missing imports in the codebase
     * @param dependencies Map of dependency nodes
     * @param missing Array to store missing imports
     */
    private async findMissingImports(dependencies: Map<string, DependencyNode>, missing: string[]): Promise<void> {
        for (const node of dependencies.values()) {
            for (const importPath of node.imports) {
                const resolvedPath = await this.resolvePath(node.path, importPath);
                if (!resolvedPath || !dependencies.has(resolvedPath)) {
                    missing.push(`${node.path} -> ${importPath}`);
                }
            }
        }
    }

    /**
     * Gets a visual representation of the dependency graph
     * @param dependencies Map of dependency nodes
     * @returns DOT format graph
     */
    public generateDependencyGraph(dependencies: Map<string, DependencyNode>): string {
        let dot = 'digraph Dependencies {\n';
        dot += '  rankdir=LR;\n';
        dot += '  node [shape=box, style=rounded];\n\n';

        // Add nodes
        for (const [path, node] of dependencies.entries()) {
            const label = path.split('/').pop() || path;
            dot += `  "${path}" [label="${label}"];\n`;
        }

        // Add edges
        for (const [path, node] of dependencies.entries()) {
            for (const dep of node.dependencies) {
                dot += `  "${path}" -> "${dep}";\n`;
            }
        }

        dot += '}\n';
        return dot;
    }
}