import { FileSystemEntry } from '../types';

export function sortFileSystemEntries(entries: FileSystemEntry[]): FileSystemEntry[] {
  return entries.sort((a, b) => {
    // Directories come before files
    if (a.type !== b.type) {
      return a.type === 'directory' ? -1 : 1;
    }
    // Sort alphabetically within the same type
    return a.name.localeCompare(b.name);
  });
}

export function getFileExtension(filename: string): string {
  const parts = filename.split('.');
  return parts.length > 1 ? parts.pop()!.toLowerCase() : '';
}

export function isTextFile(filename: string): boolean {
  const textExtensions = [
    'txt', 'md', 'json', 'js', 'jsx', 'ts', 'tsx', 'css', 'scss',
    'html', 'xml', 'yaml', 'yml', 'ini', 'conf', 'sh', 'bash',
    'py', 'rb', 'php', 'java', 'c', 'cpp', 'h', 'hpp', 'sql'
  ];
  const ext = getFileExtension(filename);
  return textExtensions.includes(ext);
}

export function getLanguageFromFilename(filename: string): string {
  const extensionMap: { [key: string]: string } = {
    'js': 'javascript',
    'jsx': 'javascript',
    'ts': 'typescript',
    'tsx': 'typescript',
    'json': 'json',
    'md': 'markdown',
    'css': 'css',
    'scss': 'scss',
    'html': 'html',
    'xml': 'xml',
    'py': 'python',
    'rb': 'ruby',
    'php': 'php',
    'java': 'java',
    'c': 'c',
    'cpp': 'cpp',
    'h': 'cpp',
    'hpp': 'cpp',
    'sql': 'sql',
    'sh': 'shell',
    'bash': 'shell',
    'yaml': 'yaml',
    'yml': 'yaml'
  };

  const ext = getFileExtension(filename);
  return extensionMap[ext] || 'plaintext';
}
