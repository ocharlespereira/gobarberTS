import { Router } from 'express';

import ForgotPasswordController from '../controller/ForgotPasswordController';

const PasswordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();

PasswordRouter.post('/forgot', forgotPasswordController.create);

export default PasswordRouter;
