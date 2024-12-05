import { Router } from 'express';
import { FileSystem } from '../services/FileSystem';

const router = Router();

interface PathParams {
  0: string;
}

// Get directory contents
router.get<PathParams>('/list/*', async (req, res) => {
  try {
    const dirPath = req.params[0] || '.';
    const entries = await FileSystem.readDirectory(dirPath);
    res.json({ data: entries });
  } catch (error) {
    console.error('Error listing directory:', error);
    res.status(500).json({ error: { message: 'Failed to list directory', code: 'LIST_ERROR' } });
  }
});

// Read file contents
router.get<PathParams>('/read/*', async (req, res) => {
  try {
    const filePath = req.params[0];
    const content = await FileSystem.readFile(filePath);
    res.json({ data: content });
  } catch (error) {
    console.error('Error reading file:', error);
    res.status(500).json({ error: { message: 'Failed to read file', code: 'READ_ERROR' } });
  }
});

// Write file contents
router.post<PathParams>('/write/*', async (req, res) => {
  try {
    const filePath = req.params[0];
    const { content } = req.body as { content: string };
    await FileSystem.writeFile(filePath, content);
    res.json({ data: 'File written successfully' });
  } catch (error) {
    console.error('Error writing file:', error);
    res.status(500).json({ error: { message: 'Failed to write file', code: 'WRITE_ERROR' } });
  }
});

// Create directory
router.post<PathParams>('/mkdir/*', async (req, res) => {
  try {
    const dirPath = req.params[0];
    await FileSystem.createDirectory(dirPath);
    res.json({ data: 'Directory created successfully' });
  } catch (error) {
    console.error('Error creating directory:', error);
    res.status(500).json({ error: { message: 'Failed to create directory', code: 'MKDIR_ERROR' } });
  }
});

// Delete file or directory
router.delete<PathParams>('/delete/*', async (req, res) => {
  try {
    const targetPath = req.params[0];
    const stats = await FileSystem.readFile(targetPath).catch(() => null);
    
    if (stats === null) {
      await FileSystem.deleteDirectory(targetPath);
    } else {
      await FileSystem.deleteFile(targetPath);
    }
    
    res.json({ data: 'Path deleted successfully' });
  } catch (error) {
    console.error('Error deleting path:', error);
    res.status(500).json({ error: { message: 'Failed to delete path', code: 'DELETE_ERROR' } });
  }
});

// Rename file or directory
router.post('/rename', async (req, res) => {
  try {
    const { oldPath, newPath } = req.body as { oldPath: string; newPath: string };
    await FileSystem.rename(oldPath, newPath);
    res.json({ data: 'Path renamed successfully' });
  } catch (error) {
    console.error('Error renaming path:', error);
    res.status(500).json({ error: { message: 'Failed to rename path', code: 'RENAME_ERROR' } });
  }
});

export default router;
