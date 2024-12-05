import express from 'express';
import { FileSystemService } from '../services/FileSystem';

const router = express.Router();
const fileSystem = new FileSystemService();

// List directories
router.get('/browse', async (req, res) => {
  try {
    const { path = '/' } = req.query;
    const contents = await fileSystem.listDirectories(path as string);
    res.json(contents);
  } catch (error) {
    console.error('Failed to list directories:', error);
    res.status(500).json({ error: 'Failed to list directories' });
  }
});

// Create directory
router.post('/directory', async (req, res) => {
  try {
    const { path } = req.body;
    await fileSystem.createDirectory(path);
    res.json({ success: true });
  } catch (error) {
    console.error('Failed to create directory:', error);
    res.status(500).json({ error: 'Failed to create directory' });
  }
});

export default router;
