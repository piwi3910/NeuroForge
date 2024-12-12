import express, { Router } from 'express';
import { projectService } from '../../services/ProjectService';

const router: Router = express.Router();

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               gitRepo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Project created successfully
 */
router.post('/', async (req, res) => {
    try {
        const { name, description, gitRepo } = req.body;
        console.log('Creating project:', { name, description, gitRepo });
        const project = await projectService.createProject(name, description, gitRepo);
        res.json(project);
    } catch (error) {
        console.error('Failed to create project:', error);
        res.status(500).json({ error: 'Failed to create project' });
    }
});

/**
 * @swagger
 * /api/projects/{projectId}:
 *   delete:
 *     summary: Delete a project
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project deleted successfully
 */
router.delete('/:projectId', async (req, res) => {
    try {
        const { projectId } = req.params;
        await projectService.resetProject(projectId);
        res.json({ success: true });
    } catch (error) {
        console.error('Failed to delete project:', error);
        res.status(500).json({ error: 'Failed to delete project' });
    }
});

/**
 * @swagger
 * /api/projects/{projectId}/description:
 *   put:
 *     summary: Update project description
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
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Project description updated successfully
 */
router.put('/:projectId/description', async (req, res) => {
    try {
        const { projectId } = req.params;
        const { description } = req.body;
        const project = await projectService.updateProjectDescription(projectId, description);
        res.json(project);
    } catch (error) {
        console.error('Failed to update project description:', error);
        res.status(500).json({ error: 'Failed to update project description' });
    }
});

export default router;
