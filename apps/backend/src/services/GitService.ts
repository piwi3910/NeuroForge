import simpleGit, { SimpleGit, StatusResult, LogResult } from 'simple-git';

export class GitService {
    private git: SimpleGit;

    constructor() {
        this.git = simpleGit();
    }

    async initRepository(projectPath: string): Promise<void> {
        console.log('Initializing git repository at:', projectPath);
        await this.git.cwd(projectPath);
        await this.git.init();
        console.log('Git repository initialized');
    }

    async createInitialCommit(projectPath: string): Promise<void> {
        await this.git.cwd(projectPath);
        await this.git.add('.');
        await this.git.commit('Initial commit');
    }

    async commitChanges(projectPath: string, message: string): Promise<void> {
        await this.git.cwd(projectPath);
        await this.git.add('.');
        await this.git.commit(message);
    }

    async cloneRepository(url: string, projectPath: string): Promise<void> {
        await this.git.clone(url, projectPath);
    }

    async createTag(projectPath: string, tagName: string): Promise<void> {
        await this.git.cwd(projectPath);
        try {
            // Try to delete the tag if it exists
            try {
                await this.git.tag(['-d', tagName]);
            } catch (error) {
                // Tag doesn't exist, that's fine
            }
            // Create the new tag
            await this.git.addTag(tagName);
        } catch (error) {
            console.error('Failed to create tag:', error);
            throw error;
        }
    }

    async checkoutTag(projectPath: string, tagName: string): Promise<void> {
        await this.git.cwd(projectPath);
        await this.git.checkout(tagName);
    }

    async listTags(projectPath: string): Promise<string[]> {
        await this.git.cwd(projectPath);
        const tags = await this.git.tags();
        return tags.all;
    }

    async getCurrentBranch(projectPath: string): Promise<string> {
        await this.git.cwd(projectPath);
        const status = await this.git.status();
        return status.current || 'HEAD';
    }

    async createBranch(projectPath: string, branchName: string): Promise<void> {
        await this.git.cwd(projectPath);
        await this.git.checkoutLocalBranch(branchName);
    }

    async switchBranch(projectPath: string, branchName: string): Promise<void> {
        await this.git.cwd(projectPath);
        await this.git.checkout(branchName);
    }

    async push(projectPath: string, remote: string = 'origin', branch?: string): Promise<void> {
        await this.git.cwd(projectPath);
        if (branch) {
            await this.git.push(remote, branch);
        } else {
            await this.git.push();
        }
    }

    async pull(projectPath: string, remote: string = 'origin', branch?: string): Promise<void> {
        await this.git.cwd(projectPath);
        if (branch) {
            await this.git.pull(remote, branch);
        } else {
            await this.git.pull();
        }
    }

    async getStatus(projectPath: string): Promise<StatusResult> {
        await this.git.cwd(projectPath);
        return await this.git.status();
    }

    async getLog(projectPath: string): Promise<LogResult> {
        await this.git.cwd(projectPath);
        return await this.git.log();
    }
}
