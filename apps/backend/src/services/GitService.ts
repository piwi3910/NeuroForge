import simpleGit, { SimpleGit } from 'simple-git';
import fs from 'fs/promises';
import path from 'path';

export class GitService {
  private git: SimpleGit;
  private projectPath: string;

  constructor(projectPath: string) {
    this.projectPath = projectPath;
    this.git = simpleGit(projectPath);
  }

  async initializeRepository(): Promise<void> {
    try {
      // Check if directory exists, if not create it
      try {
        await fs.access(this.projectPath);
      } catch {
        await fs.mkdir(this.projectPath, { recursive: true });
      }

      // Initialize git repository
      await this.git.init();
      
      // Create .gitignore if it doesn't exist
      const gitignorePath = path.join(this.projectPath, '.gitignore');
      try {
        await fs.access(gitignorePath);
      } catch {
        const defaultGitignore = `node_modules/
.env
.env.local
.DS_Store
*.log`;
        await fs.writeFile(gitignorePath, defaultGitignore);
      }

      // Initial commit
      await this.git.add('.gitignore');
      await this.git.commit('Initial commit');
    } catch (error) {
      console.error('Failed to initialize repository:', error);
      throw new Error('Failed to initialize git repository');
    }
  }

  async cloneRepository(url: string): Promise<void> {
    try {
      await this.git.clone(url, this.projectPath);
    } catch (error) {
      console.error('Failed to clone repository:', error);
      throw new Error('Failed to clone repository');
    }
  }

  async getCurrentBranch(): Promise<string> {
    try {
      const result = await this.git.branch();
      return result.current;
    } catch (error) {
      console.error('Failed to get current branch:', error);
      throw new Error('Failed to get current branch');
    }
  }

  async createBranch(branchName: string): Promise<void> {
    try {
      await this.git.checkoutLocalBranch(branchName);
    } catch (error) {
      console.error('Failed to create branch:', error);
      throw new Error('Failed to create branch');
    }
  }

  async commitChanges(message: string): Promise<void> {
    try {
      await this.git.add('.');
      await this.git.commit(message);
    } catch (error) {
      console.error('Failed to commit changes:', error);
      throw new Error('Failed to commit changes');
    }
  }

  async pushChanges(branch: string): Promise<void> {
    try {
      await this.git.push('origin', branch);
    } catch (error) {
      console.error('Failed to push changes:', error);
      throw new Error('Failed to push changes');
    }
  }

  async pullChanges(branch: string): Promise<void> {
    try {
      await this.git.pull('origin', branch);
    } catch (error) {
      console.error('Failed to pull changes:', error);
      throw new Error('Failed to pull changes');
    }
  }

  async getStatus(): Promise<string> {
    try {
      const status = await this.git.status();
      return JSON.stringify(status, null, 2);
    } catch (error) {
      console.error('Failed to get status:', error);
      throw new Error('Failed to get status');
    }
  }

  async createFeatureBranch(featureName: string): Promise<void> {
    try {
      const sanitizedName = featureName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-');
      const branchName = `feature/${sanitizedName}`;
      await this.createBranch(branchName);
    } catch (error) {
      console.error('Failed to create feature branch:', error);
      throw new Error('Failed to create feature branch');
    }
  }

  async commitAndPushFeature(featureName: string, message: string): Promise<void> {
    try {
      await this.commitChanges(message);
      const currentBranch = await this.getCurrentBranch();
      await this.pushChanges(currentBranch);
    } catch (error) {
      console.error('Failed to commit and push feature:', error);
      throw new Error('Failed to commit and push feature');
    }
  }
}
