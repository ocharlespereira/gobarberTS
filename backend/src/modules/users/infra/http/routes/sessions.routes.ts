import { Router } from 'express';

import SessionsController from '../controller/SessionsController';

const SessionsRouter = Router();
const sessionsController = new SessionsController()

SessionsRouter.post('/', sessionsController.create);

export default SessionsRouter;
