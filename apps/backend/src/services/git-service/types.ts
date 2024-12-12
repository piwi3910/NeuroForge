import { StatusResult, LogResult } from 'simple-git';

export interface BasicGitOperations {
    initRepository(projectPath: string): Promise<void>;
    cloneRepository(url: string, projectPath: string): Promise<void>;
    getStatus(projectPath: string): Promise<StatusResult>;
    getLog(projectPath: string): Promise<LogResult>;
}

export interface CommitOperations {
    createInitialCommit(projectPath: string): Promise<void>;
    commitChanges(projectPath: string, message: string): Promise<void>;
}

export interface BranchOperations {
    getCurrentBranch(projectPath: string): Promise<string>;
    createBranch(projectPath: string, branchName: string): Promise<void>;
    switchBranch(projectPath: string, branchName: string): Promise<void>;
}

export interface TagOperations {
    createTag(projectPath: string, tagName: string): Promise<void>;
    checkoutTag(projectPath: string, tagName: string): Promise<void>;
    listTags(projectPath: string): Promise<string[]>;
}

export interface RemoteOperations {
    push(projectPath: string, remote?: string, branch?: string): Promise<void>;
    pull(projectPath: string, remote?: string, branch?: string): Promise<void>;
}

export interface GitService extends 
    BasicGitOperations,
    CommitOperations,
    BranchOperations,
    TagOperations,
    RemoteOperations {}
