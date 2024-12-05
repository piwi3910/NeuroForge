import simpleGit, { SimpleGit } from 'simple-git';

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
}
