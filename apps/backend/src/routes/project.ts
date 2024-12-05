import express from 'express';
import { ProjectService } from '../services/ProjectService';
import { AIArchitectService } from '../services/AIArchitect';
import path from 'path';

const router = express.Router();
const projectService = new ProjectService(path.join(process.cwd(), 'projects'));
const aiArchitect = new AIArchitectService();

// Create a new project
router.post('/', async (req, res) => {
  try {
    const { name, description, gitRepo } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Project name is required' });
    }

    console.log('Creating project:', { name, description, gitRepo });
    const project = await projectService.createProject(name, description, gitRepo);
    console.log('Project created:', project);
    res.json(project);
  } catch (error) {
    console.error('Failed to create project:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to create project',
      details: error
    });
  }
});

// Update project description
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

// Generate system prompt
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

// Chat with AI Architect
router.post('/:projectId/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await aiArchitect.chat([
      {
        role: 'user',
        content: message
      }
    ]);

    res.json({
      role: 'assistant',
      content: response,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Failed to chat with AI:', error);
    res.status(500).json({ error: 'Failed to chat with AI' });
  }
});

// Get project details
router.get('/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = projectService.getProject(projectId);
    res.json(project);
  } catch (error) {
    console.error('Failed to get project:', error);
    res.status(500).json({ error: 'Failed to get project' });
  }
});

// Commit project changes
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
