export interface FileSystemEntry {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: FileSystemEntry[];
}

export interface FileSystemError {
  message: string;
  code: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: FileSystemError;
}
