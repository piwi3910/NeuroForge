import express from 'express';
import { FileSystemService } from '../services/FileSystem';

const router = express.Router();
const fileSystem = new FileSystemService();

// Browse directories
router.get('/browse', async (req, res) => {
  try {
    const { path } = req.query;
    if (!path || typeof path !== 'string') {
      return res.status(400).json({ error: 'Path is required' });
    }

    const directories = await fileSystem.listDirectories(path);
    res.json(directories);
  } catch (error) {
    console.error('Failed to list directories:', error);
    res.status(500).json({ error: 'Failed to list directories' });
  }
});

// Create directory
router.post('/directory', async (req, res) => {
  try {
    const { path } = req.body;
    if (!path) {
      return res.status(400).json({ error: 'Path is required' });
    }

    await fileSystem.createDirectory(path);
    res.json({ success: true });
  } catch (error) {
    console.error('Failed to create directory:', error);
    res.status(500).json({ error: 'Failed to create directory' });
  }
});

export default router;
