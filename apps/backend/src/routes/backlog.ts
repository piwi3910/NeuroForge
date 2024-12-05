import express from 'express';
import { BacklogService } from '../services/BacklogService';
import { BacklogItem, BacklogFilter, BacklogUpdate, ItemType } from '../types/backlog';

const router = express.Router();
const backlogService = new BacklogService();

// Create a new backlog item
router.post('/', async (req, res) => {
  try {
    const {
      projectId,
      type,
      title,
      description,
      priority,
      epicId,
      storyId
    } = req.body;

    const item = backlogService.createItem(
      projectId,
      type as ItemType,
      title,
      description,
      priority,
      epicId,
      storyId
    );

    res.json(item);
  } catch (error) {
    console.error('Failed to create backlog item:', error);
    res.status(500).json({ error: 'Failed to create backlog item' });
  }
});

// Get backlog items with filtering
router.get('/', async (req, res) => {
  try {
    const filter: BacklogFilter = {
      projectId: req.query.projectId as string,
      type: req.query.type as ItemType | undefined,
      status: req.query.status as BacklogItem['status'] | undefined,
      epicId: req.query.epicId as string | undefined,
      storyId: req.query.storyId as string | undefined,
      assignedTo: req.query.assignedTo as string | undefined,
      labels: req.query.labels ? (req.query.labels as string).split(',') : undefined,
      search: req.query.search as string | undefined
    };

    const items = backlogService.getItems(filter);
    res.json(items);
  } catch (error) {
    console.error('Failed to get backlog items:', error);
    res.status(500).json({ error: 'Failed to get backlog items' });
  }
});

// Update a backlog item
router.put('/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;
    const update: BacklogUpdate = req.body;
    const updatedItem = backlogService.updateItem(itemId, update);
    res.json(updatedItem);
  } catch (error) {
    console.error('Failed to update backlog item:', error);
    res.status(500).json({ error: 'Failed to update backlog item' });
  }
});

// Update item status
router.put('/:itemId/status', async (req, res) => {
  try {
    const { itemId } = req.params;
    const { status } = req.body;
    const updatedItem = backlogService.updateStatus(itemId, status);
    res.json(updatedItem);
  } catch (error) {
    console.error('Failed to update item status:', error);
    res.status(500).json({ error: 'Failed to update item status' });
  }
});

// Delete a backlog item
router.delete('/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;
    backlogService.deleteItem(itemId);
    res.json({ success: true });
  } catch (error) {
    console.error('Failed to delete backlog item:', error);
    res.status(500).json({ error: 'Failed to delete backlog item' });
  }
});

// Get item hierarchy for a project
router.get('/hierarchy/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;
    const hierarchy = backlogService.getItemHierarchy(projectId);
    res.json(hierarchy);
  } catch (error) {
    console.error('Failed to get item hierarchy:', error);
    res.status(500).json({ error: 'Failed to get item hierarchy' });
  }
});

// Generate backlog items using AI
router.post('/generate', async (req, res) => {
  try {
    const { projectId, projectDescription, systemPrompt } = req.body;
    const items = await backlogService.generateBacklogItems(
      projectId,
      projectDescription,
      systemPrompt
    );
    res.json(items);
  } catch (error) {
    console.error('Failed to generate backlog items:', error);
    res.status(500).json({ error: 'Failed to generate backlog items' });
  }
});

export default router;
