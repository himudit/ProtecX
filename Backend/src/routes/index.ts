import { Router } from 'express';
import * as projectController from '../controllers/project.controller';

const router = Router();

// Example route
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    version: '1.0.0',
  });
});

// Project routes
router.post('/projects', projectController.createProject);

export default router;

