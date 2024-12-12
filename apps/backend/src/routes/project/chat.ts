import express, { Router } from 'express';
import { projectService } from '../../services/ProjectService';
import { AIArchitectService } from '../../services/AIArchitect';
import { dbService } from '../../services/DatabaseService';

const router: Router = express.Router();
const aiArchitect = new AIArchitectService();

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

        // Save user message
        await dbService.saveChatMessage(projectId, 'user', message);

        // Get AI response
        const response = await aiArchitect.chat([{
            role: 'user',
            content: message
        }]);

        // Save AI response
        await dbService.saveChatMessage(projectId, 'assistant', response.message);

        // If AI response includes project details, update them
        if (response.details) {
            await projectService.updateProjectDescription(projectId, response.details.description || '');
        }

        res.json({
            content: response.message,
            timestamp: new Date(),
            details: response.details
        });
    } catch (error) {
        console.error('Failed to chat with AI:', error);
        res.status(500).json({ error: 'Failed to chat with AI' });
    }
});

export default router;
