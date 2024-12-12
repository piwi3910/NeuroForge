import git from 'isomorphic-git'
import fs from 'fs'
import { GitServiceInterface, GitConfig, GitStatus, GitCommit, GitBranch } from './types'
import http from 'isomorphic-git/http/node'

export class IsomorphicGitService implements GitServiceInterface {
  async init(path: string): Promise<void> {
    await git.init({ fs, dir: path })
  }

  async clone(url: string, path: string): Promise<void> {
    await git.clone({
      fs,
      http,
      dir: path,
      url,
      singleBranch: true,
      depth: 1,
    })
  }

  async add(path: string, filepath: string): Promise<void> {
    await git.add({ fs, dir: path, filepath })
  }

  async commit(path: string, message: string): Promise<string> {
    const sha = await git.commit({
      fs,
      dir: path,
      message,
      author: {
        name: 'NeuroForge',
        email: 'ai@neuroforge.dev',
      },
    })
    return sha
  }

  async push(path: string): Promise<void> {
    const currentBranch = await this.getCurrentBranch(path)
    if (!currentBranch) throw new Error('No current branch found')

    await git.push({
      fs,
      http,
      dir: path,
      remote: 'origin',
      ref: currentBranch,
    })
  }

  async pull(path: string): Promise<void> {
    const currentBranch = await this.getCurrentBranch(path)
    if (!currentBranch) throw new Error('No current branch found')

    await git.pull({
      fs,
      http,
      dir: path,
      ref: currentBranch,
      author: {
        name: 'NeuroForge',
        email: 'ai@neuroforge.dev',
      },
    })
  }

  async status(path: string): Promise<GitStatus> {
    const statusMatrix = await git.statusMatrix({ fs, dir: path })
    const files = statusMatrix.map(([filepath, head, workdir, stage]) => ({
      path: filepath,
      status: this.getStatusString(head, workdir, stage),
    }))

    const staged = files.filter(f => f.status.includes('staged')).map(f => f.path)
    const unstaged = files.filter(f => f.status.includes('modified')).map(f => f.path)

    return { files, staged, unstaged }
  }

  async log(path: string): Promise<GitCommit[]> {
    const commits = await git.log({
      fs,
      dir: path,
      depth: 10,
    })

    return commits.map(commit => ({
      message: commit.commit.message,
      hash: commit.oid,
      author: {
        name: commit.commit.author.name,
        email: commit.commit.author.email,
        timestamp: commit.commit.author.timestamp * 1000,
      },
    }))
  }

  async branches(path: string): Promise<GitBranch[]> {
    const currentBranch = await this.getCurrentBranch(path)
    const branches = await git.listBranches({ fs, dir: path })

    return branches.map(name => ({
      name,
      current: name === currentBranch,
    }))
  }

  async checkout(path: string, branch: string): Promise<void> {
    await git.checkout({
      fs,
      dir: path,
      ref: branch,
    })
  }

  async setConfig(path: string, config: GitConfig): Promise<void> {
    await git.setConfig({
      fs,
      dir: path,
      path: 'user.name',
      value: config.name,
    })

    await git.setConfig({
      fs,
      dir: path,
      path: 'user.email',
      value: config.email,
    })
  }

  private async getCurrentBranch(path: string): Promise<string | null> {
    const branch = await git.currentBranch({
      fs,
      dir: path,
      fullname: false,
    })
    return branch || null
  }

  private getStatusString(head: number, workdir: number, stage: number): string {
    if (head === 0 && workdir === 2 && stage === 0) return 'untracked'
    if (head === 1 && workdir === 2 && stage === 1) return 'modified'
    if (head === 1 && workdir === 2 && stage === 2) return 'modified and staged'
    if (head === 1 && workdir === 0 && stage === 0) return 'deleted'
    if (head === 1 && workdir === 0 && stage === 2) return 'deleted and staged'
    if (head === 0 && workdir === 2 && stage === 2) return 'added and staged'
    return 'unknown'
  }
}
