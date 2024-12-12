export interface GitConfig {
  name: string
  email: string
}

export interface GitStatus {
  files: Array<{
    path: string
    status: string
  }>
  staged: string[]
  unstaged: string[]
}

export interface GitCommit {
  message: string
  hash: string
  author: {
    name: string
    email: string
    timestamp: number
  }
}

export interface GitBranch {
  name: string
  current: boolean
}

export interface GitServiceInterface {
  init(path: string): Promise<void>
  clone(url: string, path: string): Promise<void>
  add(path: string, filepath: string): Promise<void>
  commit(path: string, message: string): Promise<string>
  push(path: string): Promise<void>
  pull(path: string): Promise<void>
  status(path: string): Promise<GitStatus>
  log(path: string): Promise<GitCommit[]>
  branches(path: string): Promise<GitBranch[]>
  checkout(path: string, branch: string): Promise<void>
  setConfig(path: string, config: GitConfig): Promise<void>
}
