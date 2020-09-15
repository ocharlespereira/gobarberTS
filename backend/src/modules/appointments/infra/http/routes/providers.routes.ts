import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controller/ProvidersController';
import ProviderMonthAvailabilityController from '../controller/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controller/ProviderDayAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get('/:id/month-availability', providersController.index);
providersRouter.get('/:id/day-availability', providersController.index);

export default providersRouter;
