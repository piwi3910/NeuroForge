import express, { Router } from 'express';
import { projectService } from '../../services/ProjectService';

const router: Router = express.Router();

/**
 * @swagger
 * /api/projects/{projectId}/commit:
 *   post:
 *     summary: Commit project changes
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Changes committed successfully
 */
router.post('/:projectId/commit', async (req, res) => {
    try {
        const { projectId } = req.params;
        const { message } = req.body;
        await projectService.commitProjectChanges(projectId, message);
        res.json({ success: true });
    } catch (error) {
        console.error('Failed to commit changes:', error);
        res.status(500).json({ error: 'Failed to commit changes' });
    }
});

export default router;
