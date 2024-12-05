import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

export class GitService {
  private projectPath: string;

  constructor(projectPath: string) {
    this.projectPath = projectPath;
  }

  async initializeRepository(): Promise<void> {
    try {
      console.log('Initializing git repository at:', this.projectPath);
      
      // Initialize git repository
      await execAsync('git init', { cwd: this.projectPath });
      console.log('Git repository initialized');

      // Create initial .gitignore
      const gitignorePath = path.join(this.projectPath, '.gitignore');
      const gitignoreContent = `node_modules/
.env
.env.local
.DS_Store
*.log`;
      await execAsync(`echo "${gitignoreContent}" > .gitignore`, { cwd: this.projectPath });
      console.log('Created .gitignore');

      // Create initial README.md
      const readmePath = path.join(this.projectPath, 'README.md');
      const readmeContent = `# Project\n\nThis project was created with NeuroForge.`;
      await execAsync(`echo "${readmeContent}" > README.md`, { cwd: this.projectPath });
      console.log('Created README.md');

      // Add and commit initial files
      await execAsync('git add .', { cwd: this.projectPath });
      await execAsync('git commit -m "Initial commit"', { 
        cwd: this.projectPath,
        env: {
          ...process.env,
          GIT_AUTHOR_NAME: 'NeuroForge',
          GIT_AUTHOR_EMAIL: 'ai@neuroforge.dev',
          GIT_COMMITTER_NAME: 'NeuroForge',
          GIT_COMMITTER_EMAIL: 'ai@neuroforge.dev'
        }
      });
      console.log('Created initial commit');

    } catch (error) {
      console.error('Error initializing git repository:', error);
      throw new Error('Failed to initialize git repository');
    }
  }

  async cloneRepository(repoUrl: string): Promise<void> {
    try {
      await execAsync(`git clone ${repoUrl} .`, { cwd: this.projectPath });
    } catch (error) {
      console.error('Error cloning repository:', error);
      throw new Error('Failed to clone repository');
    }
  }

  async commitChanges(message: string): Promise<void> {
    try {
      await execAsync('git add .', { cwd: this.projectPath });
      await execAsync(`git commit -m "${message}"`, { 
        cwd: this.projectPath,
        env: {
          ...process.env,
          GIT_AUTHOR_NAME: 'NeuroForge',
          GIT_AUTHOR_EMAIL: 'ai@neuroforge.dev',
          GIT_COMMITTER_NAME: 'NeuroForge',
          GIT_COMMITTER_EMAIL: 'ai@neuroforge.dev'
        }
      });
    } catch (error) {
      console.error('Error committing changes:', error);
      throw new Error('Failed to commit changes');
    }
  }

  async createFeatureBranch(branchName: string): Promise<void> {
    try {
      await execAsync(`git checkout -b ${branchName}`, { cwd: this.projectPath });
    } catch (error) {
      console.error('Error creating feature branch:', error);
      throw new Error('Failed to create feature branch');
    }
  }

  async getCurrentBranch(): Promise<string> {
    try {
      const { stdout } = await execAsync('git rev-parse --abbrev-ref HEAD', { cwd: this.projectPath });
      return stdout.trim();
    } catch (error) {
      console.error('Error getting current branch:', error);
      throw new Error('Failed to get current branch');
    }
  }

  async getBranches(): Promise<string[]> {
    try {
      const { stdout } = await execAsync('git branch', { cwd: this.projectPath });
      return stdout
        .split('\n')
        .map(branch => branch.trim())
        .filter(branch => branch.length > 0)
        .map(branch => branch.replace('* ', ''));
    } catch (error) {
      console.error('Error getting branches:', error);
      throw new Error('Failed to get branches');
    }
  }
}
