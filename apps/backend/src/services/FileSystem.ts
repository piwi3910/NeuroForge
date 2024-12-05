import fs from 'fs/promises';
import path from 'path';
import { FileSystemEntry } from '@neuroforge/shared';

export class FileSystem {
  static async readDirectory(dirPath: string): Promise<FileSystemEntry[]> {
    try {
      const entries = await fs.readdir(dirPath, { withFileTypes: true });
      const result: FileSystemEntry[] = [];

      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
          const children = await this.readDirectory(fullPath);
          result.push({
            name: entry.name,
            path: fullPath,
            type: 'directory',
            children
          });
        } else {
          result.push({
            name: entry.name,
            path: fullPath,
            type: 'file'
          });
        }
      }

      return result;
    } catch (error) {
      console.error('Error reading directory:', error);
      throw error;
    }
  }

  static async readFile(filePath: string): Promise<string> {
    try {
      return await fs.readFile(filePath, 'utf-8');
    } catch (error) {
      console.error('Error reading file:', error);
      throw error;
    }
  }

  static async writeFile(filePath: string, content: string): Promise<void> {
    try {
      const dir = path.dirname(filePath);
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(filePath, content, 'utf-8');
    } catch (error) {
      console.error('Error writing file:', error);
      throw error;
    }
  }

  static async deleteFile(filePath: string): Promise<void> {
    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }

  static async createDirectory(dirPath: string): Promise<void> {
    try {
      await fs.mkdir(dirPath, { recursive: true });
    } catch (error) {
      console.error('Error creating directory:', error);
      throw error;
    }
  }

  static async deleteDirectory(dirPath: string): Promise<void> {
    try {
      await fs.rm(dirPath, { recursive: true });
    } catch (error) {
      console.error('Error deleting directory:', error);
      throw error;
    }
  }

  static async rename(oldPath: string, newPath: string): Promise<void> {
    try {
      await fs.rename(oldPath, newPath);
    } catch (error) {
      console.error('Error renaming path:', error);
      throw error;
    }
  }
}
