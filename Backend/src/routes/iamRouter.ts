import { Router } from 'express';
import * as gatewayController from '../controllers/gateway.controller';
import { requestLogger } from '../middlewares/requestLogger.middleware';

const iamRouter = Router();

// Apply requestLogger ONLY to iam routes
iamRouter.use(requestLogger);

// iam routes (connection for microservice)
iamRouter.post('/register', gatewayController.gateWaySignup);
iamRouter.post('/login', gatewayController.gateWayLogin);
// iamRouter.get('/profile', gatewayController.gateWayProfile);
iamRouter.post('/refresh', gatewayController.gateWayRefresh);
iamRouter.post('/logout', gatewayController.gateWayLogout);

export default iamRouter;
