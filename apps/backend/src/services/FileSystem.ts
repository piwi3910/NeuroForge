import fs from 'fs/promises';
import path from 'path';

interface BaseEntry {
  path: string;
  name: string;
}

interface DirectoryEntry extends BaseEntry {
  type: 'directory';
}

interface ParentEntry extends BaseEntry {
  type: 'parent';
}

type FileSystemEntry = DirectoryEntry | ParentEntry;

export class FileSystemService {
  async listDirectories(dirPath: string): Promise<FileSystemEntry[]> {
    try {
      // Normalize and resolve the path
      const normalizedPath = path.resolve(dirPath);
      
      // Get directory contents
      const contents = await fs.readdir(normalizedPath, { withFileTypes: true });
      
      // Filter for directories only and map to response format
      const directories: FileSystemEntry[] = contents
        .filter(dirent => dirent.isDirectory())
        .map(dirent => ({
          path: path.join(normalizedPath, dirent.name),
          name: dirent.name,
          type: 'directory'
        }));

      // Add parent directory if not at root
      if (normalizedPath !== '/') {
        directories.unshift({
          path: path.dirname(normalizedPath),
          name: '..',
          type: 'parent'
        });
      }

      return directories;
    } catch (error) {
      console.error('Failed to list directories:', error);
      throw new Error('Failed to list directories');
    }
  }

  async createDirectory(dirPath: string): Promise<void> {
    try {
      await fs.mkdir(dirPath, { recursive: true });
    } catch (error) {
      console.error('Failed to create directory:', error);
      throw new Error('Failed to create directory');
    }
  }

  async validatePath(dirPath: string): Promise<boolean> {
    try {
      const stats = await fs.stat(dirPath);
      return stats.isDirectory();
    } catch {
      return false;
    }
  }

  async ensureDirectoryExists(dirPath: string): Promise<void> {
    try {
      await fs.access(dirPath);
    } catch {
      await this.createDirectory(dirPath);
    }
  }
}
