import { Injectable } from '@nestjs/common'
import { IsomorphicGitService } from './git-service/IsomorphicGitService'
import type { GitConfig, GitStatus, GitCommit, GitBranch } from './git-service/types'

@Injectable()
export class GitService {
  private gitService: IsomorphicGitService

  constructor() {
    this.gitService = new IsomorphicGitService()
  }

  async initRepository(path: string): Promise<void> {
    await this.gitService.init(path)
  }

  async cloneRepository(url: string, path: string): Promise<void> {
    await this.gitService.clone(url, path)
  }

  async addFile(path: string, filepath: string): Promise<void> {
    await this.gitService.add(path, filepath)
  }

  async commit(path: string, message: string): Promise<string> {
    return this.gitService.commit(path, message)
  }

  async push(path: string): Promise<void> {
    await this.gitService.push(path)
  }

  async pull(path: string): Promise<void> {
    await this.gitService.pull(path)
  }

  async getStatus(path: string): Promise<GitStatus> {
    return this.gitService.status(path)
  }

  async getLog(path: string): Promise<GitCommit[]> {
    return this.gitService.log(path)
  }

  async getBranches(path: string): Promise<GitBranch[]> {
    return this.gitService.branches(path)
  }

  async checkoutBranch(path: string, branch: string): Promise<void> {
    await this.gitService.checkout(path, branch)
  }

  async setConfig(path: string, config: GitConfig): Promise<void> {
    await this.gitService.setConfig(path, config)
  }
}
