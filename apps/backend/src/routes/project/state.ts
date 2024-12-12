import express, { Router } from 'express';
import { projectService } from '../../services/ProjectService';

const router: Router = express.Router();

/**
 * @swagger
 * /api/projects/saves/count:
 *   get:
 *     summary: Get total number of saved projects
 *     responses:
 *       200:
 *         description: Total number of saved projects
 */
router.get('/saves/count', async (req, res) => {
    try {
        const count = await projectService.getTotalSavedProjects();
        res.json({ count });
    } catch (error) {
        console.error('Failed to get total saved projects:', error);
        res.status(500).json({ error: 'Failed to get total saved projects' });
    }
});

/**
 * @swagger
 * /api/projects/{projectId}/save:
 *   post:
 *     summary: Save project state
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
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Project state saved successfully
 */
router.post('/:projectId/save', async (req, res) => {
    try {
        const { projectId } = req.params;
        const { name } = req.body;
        await projectService.saveProjectState(projectId, name);
        res.json({ success: true });
    } catch (error) {
        console.error('Failed to save project state:', error);
        res.status(500).json({ error: 'Failed to save project state' });
    }
});

/**
 * @swagger
 * /api/projects/{projectId}/load:
 *   post:
 *     summary: Load project state
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
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Project state loaded successfully
 */
router.post('/:projectId/load', async (req, res) => {
    try {
        const { projectId } = req.params;
        const { name } = req.body;
        const project = await projectService.loadProjectState(projectId, name);
        res.json(project);
    } catch (error) {
        console.error('Failed to load project state:', error);
        res.status(500).json({ error: 'Failed to load project state' });
    }
});

/**
 * @swagger
 * /api/projects/{projectId}/saves:
 *   get:
 *     summary: List project saves
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of project saves
 */
router.get('/:projectId/saves', async (req, res) => {
    try {
        const { projectId } = req.params;
        console.log('Listing saves for project:', projectId);
        const saves = await projectService.listProjectSaves(projectId);
        console.log('Found saves:', saves);
        res.json(saves);
    } catch (error) {
        console.error('Failed to list project saves:', error);
        res.status(500).json({ error: 'Failed to list project saves' });
    }
});

export default router;
