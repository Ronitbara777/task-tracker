import express from 'express';
import Task from '../models/Task.js';

const router = express.Router();

// GET /api/tasks -> get all tasks
router.get('/', async (req, res, next) => {
  try {
    const { status, priority } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    next(error);
  }
});

// GET /api/tasks/:id -> get single task
router.get('/:id', async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
});

// POST /api/tasks -> create task
router.post('/', async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    
    if (!title) {
      return res.status(400).json({ success: false, message: 'Task title is required' });
    }

    const newTask = await Task.create({ title, description, status, priority, dueDate });
    res.status(201).json({ success: true, data: newTask });
  } catch (error) {
    if (error.name === 'ValidationError') {
       return res.status(400).json({ success: false, message: error.message });
    }
    next(error);
  }
});

// PUT /api/tasks/:id -> update task
router.put('/:id', async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { 
      new: true, 
      runValidators: true 
    });
    
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    if (error.name === 'ValidationError') {
       return res.status(400).json({ success: false, message: error.message });
    }
    next(error);
  }
});

// DELETE /api/tasks/:id -> delete task
router.delete('/:id', async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    
    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
