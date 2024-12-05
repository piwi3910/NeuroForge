import express from 'express';
import { projectService } from '../services/ProjectService';

const router = express.Router();

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

/**
 * @swagger
 * /api/projects/{projectId}/system-prompt:
 *   post:
 *     summary: Generate system prompt for project
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: System prompt generated successfully
 */
router.post('/:projectId/system-prompt', async (req, res) => {
    try {
        const { projectId } = req.params;
        const project = await projectService.generateSystemPrompt(projectId);
        res.json(project);
    } catch (error) {
        console.error('Failed to generate system prompt:', error);
        res.status(500).json({ error: 'Failed to generate system prompt' });
    }
});

/**
 * @swagger
 * /api/projects/{projectId}/chat:
 *   post:
 *     summary: Chat with AI about project
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
 *         description: AI response received successfully
 */
router.post('/:projectId/chat', async (req, res) => {
    try {
        const { projectId } = req.params;
        const { message } = req.body;
        const project = await projectService.generateSystemPrompt(projectId);
        res.json({
            content: "Hello! I'm your AI Architect. Let's define your project together.",
            timestamp: new Date(),
            details: project
        });
    } catch (error) {
        console.error('Failed to chat with AI:', error);
        res.status(500).json({ error: 'Failed to chat with AI' });
    }
});

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
