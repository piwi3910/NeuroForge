import fs from 'fs/promises';
import path from 'path';

export class FileSystem {
    async listDirectory(dirPath: string) {
        try {
            const entries = await fs.readdir(dirPath, { withFileTypes: true });
            return entries.map(entry => ({
                name: entry.name,
                path: path.join(dirPath, entry.name),
                type: entry.isDirectory() ? 'directory' : 'file'
            }));
        } catch (error) {
            console.error('Failed to list directory:', error);
            throw error;
        }
    }

    async createDirectory(dirPath: string) {
        try {
            await fs.mkdir(dirPath, { recursive: true });
        } catch (error) {
            console.error('Failed to create directory:', error);
            throw error;
        }
    }

    async deleteDirectory(dirPath: string) {
        try {
            await fs.rm(dirPath, { recursive: true, force: true });
        } catch (error) {
            console.error('Failed to delete directory:', error);
            throw error;
        }
    }

    async readFile(filePath: string) {
        try {
            const content = await fs.readFile(filePath, 'utf-8');
            return content;
        } catch (error) {
            console.error('Failed to read file:', error);
            throw error;
        }
    }

    async writeFile(filePath: string, content: string) {
        try {
            // Create directory if it doesn't exist
            const dir = path.dirname(filePath);
            await fs.mkdir(dir, { recursive: true });
            
            await fs.writeFile(filePath, content, 'utf-8');
        } catch (error) {
            console.error('Failed to write file:', error);
            throw error;
        }
    }

    async deleteFile(filePath: string) {
        try {
            await fs.unlink(filePath);
        } catch (error) {
            console.error('Failed to delete file:', error);
            throw error;
        }
    }

    async exists(path: string) {
        try {
            await fs.access(path);
            return true;
        } catch {
            return false;
        }
    }

    async isDirectory(path: string) {
        try {
            const stats = await fs.stat(path);
            return stats.isDirectory();
        } catch {
            return false;
        }
    }

    async isFile(path: string) {
        try {
            const stats = await fs.stat(path);
            return stats.isFile();
        } catch {
            return false;
        }
    }
}

export const fileSystem = new FileSystem();
