import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SessionsController from '../controller/SessionsController';

const SessionsRouter = Router();
const sessionsController = new SessionsController();

SessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
);

export default SessionsRouter;
