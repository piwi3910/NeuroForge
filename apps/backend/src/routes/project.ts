import express from 'express';
import { ProjectService } from '../services/ProjectService';
import path from 'path';

const router = express.Router();
const projectService = new ProjectService(path.join(process.cwd(), 'projects'));

// Create a new project
router.post('/', async (req, res) => {
  try {
    const { name, description, gitRepo } = req.body;
    const project = await projectService.createProject(name, description, gitRepo);
    res.json(project);
  } catch (error) {
    console.error('Failed to create project:', error);
    res.status(500).json({ error: 'Failed to create project' });
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

// Generate backlog items
router.post('/:projectId/backlog/generate', async (req, res) => {
  try {
    const { projectId } = req.params;
    const items = await projectService.generateBacklogItems(projectId);
    res.json(items);
  } catch (error) {
    console.error('Failed to generate backlog items:', error);
    res.status(500).json({ error: 'Failed to generate backlog items' });
  }
});

// Chat with AI Architect
router.post('/:projectId/chat', async (req, res) => {
  try {
    const { projectId } = req.params;
    const { message } = req.body;
    const response = await projectService.chatWithAI(projectId, message);
    res.json(response);
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

// Get project chat history
router.get('/:projectId/chat', async (req, res) => {
  try {
    const { projectId } = req.params;
    const chat = projectService.getProjectChat(projectId);
    res.json(chat);
  } catch (error) {
    console.error('Failed to get project chat:', error);
    res.status(500).json({ error: 'Failed to get project chat' });
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

// Create feature branch
router.post('/:projectId/branch', async (req, res) => {
  try {
    const { projectId } = req.params;
    const { featureName } = req.body;
    await projectService.createFeatureBranch(projectId, featureName);
    res.json({ success: true });
  } catch (error) {
    console.error('Failed to create feature branch:', error);
    res.status(500).json({ error: 'Failed to create feature branch' });
  }
});

export default router;
