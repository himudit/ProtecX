import { Router } from 'express';
import * as gatewayController from '../controllers/gateway.controller';
import { requestLogger } from '../middlewares/requestLogger.middleware';

const iamRouter = Router();

iamRouter.use(requestLogger);

iamRouter.post('/register', gatewayController.gateWayRegister);
iamRouter.post('/login', gatewayController.gateWayLogin);
iamRouter.get('/profile', gatewayController.gateWayProfile);
iamRouter.post('/refresh', gatewayController.gateWayRefresh);
iamRouter.post('/logout', gatewayController.gateWayLogout);

export default iamRouter;
