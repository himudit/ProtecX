import { Router } from 'express';
import * as projectController from '../controllers/project.controller';
import * as userController from '../controllers/user.controller';
import * as gatwayController from '../controllers/gateway.controller';
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
router.get('/projects', authMiddleware, projectController.getProjects);
router.get('/projects/users/me', authMiddleware, projectController.getProjectUsers);
router.get('/projects/:projectId', authMiddleware, projectController.getProjectById);

// iam routes (connection for microservice)
router.post('/iam/register', gatwayController.gateWaySignup);
router.post('/iam/login', gatwayController.gateWayLogin);
// router.get('/iam/profile', gatwayController.gateWayProfile);
router.post('/iam/refresh', gatwayController.gateWayRefresh);
// router.post('/iam/logout',  gatwayController.gateWayLogout);

export default router;

