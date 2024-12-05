import express from 'express';
import { BacklogItem, BacklogFilter, ItemType, ItemStatus } from '../types/backlog';
import { BacklogService } from '../services/BacklogService';
import { AIArchitectService } from '../services/AIArchitect';

const router = express.Router();
const aiArchitect = new AIArchitectService();
const backlogService = new BacklogService(aiArchitect);

// Create backlog item
router.post('/', async (req, res) => {
  try {
    const {
      projectId,
      type,
      title,
      description,
      priority,
      parentId,
      createdBy
    } = req.body;

    const item = await backlogService.createItem({
      projectId,
      type,
      title,
      description,
      status: 'To Do' as ItemStatus,
      priority,
      order: 0,
      parentId,
      createdBy
    });

    res.json(item);
  } catch (error) {
    console.error('Failed to create backlog item:', error);
    res.status(500).json({ error: 'Failed to create backlog item' });
  }
});

// Get backlog items
router.get('/', async (req, res) => {
  try {
    const filter: BacklogFilter = {
      projectId: req.query.projectId as string,
      type: req.query.type as ItemType | undefined,
      status: req.query.status as ItemStatus | undefined,
      parentId: req.query.parentId as string | undefined
    };

    const items = await backlogService.getItems(filter.projectId);
    res.json(items);
  } catch (error) {
    console.error('Failed to get backlog items:', error);
    res.status(500).json({ error: 'Failed to get backlog items' });
  }
});

// Update backlog item
router.put('/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;
    const update = req.body;
    const updatedItem = await backlogService.updateItem(itemId, update);
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
    const updatedItem = await backlogService.updateStatus(itemId, status);
    res.json(updatedItem);
  } catch (error) {
    console.error('Failed to update item status:', error);
    res.status(500).json({ error: 'Failed to update item status' });
  }
});

// Delete backlog item
router.delete('/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;
    await backlogService.deleteItem(itemId);
    res.json({ success: true });
  } catch (error) {
    console.error('Failed to delete backlog item:', error);
    res.status(500).json({ error: 'Failed to delete backlog item' });
  }
});

// Get item hierarchy
router.get('/hierarchy/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;
    const hierarchy = await backlogService.getItemHierarchy(projectId);
    res.json(hierarchy);
  } catch (error) {
    console.error('Failed to get item hierarchy:', error);
    res.status(500).json({ error: 'Failed to get item hierarchy' });
  }
});

// Generate backlog items
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
