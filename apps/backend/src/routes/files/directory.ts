import express from 'express';
import { fileSystem } from '../../services/FileSystem';
import path from 'path';

const router = express.Router();

/**
 * @swagger
 * /api/files/browse:
 *   get:
 *     summary: Browse directory contents
 *     parameters:
 *       - in: query
 *         name: path
 *         schema:
 *           type: string
 *         description: Directory path to browse
 *     responses:
 *       200:
 *         description: Directory contents
 */
router.get('/browse', async (req, res) => {
    try {
        const dirPath = req.query.path as string || process.env.BASE_PROJECTS_PATH || path.join(process.cwd(), '../../projects');
        console.log('Browsing directory:', dirPath);

        const entries = await fileSystem.listDirectory(dirPath);
        res.json(entries);
    } catch (error) {
        console.error('Failed to browse directory:', error);
        res.status(500).json({ error: 'Failed to browse directory' });
    }
});

/**
 * @swagger
 * /api/files/directory:
 *   post:
 *     summary: Create a new directory
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               path:
 *                 type: string
 *     responses:
 *       200:
 *         description: Directory created successfully
 */
router.post('/directory', async (req, res) => {
    try {
        const { path: dirPath } = req.body;
        if (!dirPath) {
            return res.status(400).json({ error: 'Directory path is required' });
        }

        await fileSystem.createDirectory(dirPath);
        res.json({ success: true });
    } catch (error) {
        console.error('Failed to create directory:', error);
        res.status(500).json({ error: 'Failed to create directory' });
    }
});

/**
 * @swagger
 * /api/files/directory:
 *   delete:
 *     summary: Delete a directory
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               path:
 *                 type: string
 *     responses:
 *       200:
 *         description: Directory deleted successfully
 */
router.delete('/directory', async (req, res) => {
    try {
        const { path: dirPath } = req.body;
        if (!dirPath) {
            return res.status(400).json({ error: 'Directory path is required' });
        }

        await fileSystem.deleteDirectory(dirPath);
        res.json({ success: true });
    } catch (error) {
        console.error('Failed to delete directory:', error);
        res.status(500).json({ error: 'Failed to delete directory' });
    }
});

export default router;
