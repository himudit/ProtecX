import { Router } from 'express';
import * as projectController from '../controllers/project.controller';
import * as userController from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Example route
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    version: '1.0.0',
  });
});

// User routes
router.post('/auth/signup', userController.signup);
router.post('/auth/login', userController.login);
router.get('/auth/profile', authMiddleware, userController.getProfile);

// Project routes
router.post('/projects', authMiddleware, projectController.createProject);

export default router;

