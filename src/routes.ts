import { Router } from 'express';

import ensureAuthenticated from 'middlewares/ensureAuthenticated';
import GetLast3MessagesController from 'controllers/GetLast3MessagesController';
import SessionsController from './controllers/SessionsController';
import CreateMessageController from './controllers/CreateMessageController';
import ProfileUserController from './controllers/ProfileUserController';

const routes = Router();

const sessionsController = new SessionsController();
const createMessageController = new CreateMessageController();
const getLast3MessagesController = new GetLast3MessagesController();
const profileUserController = new ProfileUserController();

routes.post('/authenticate', sessionsController.create);

routes.post('/message', ensureAuthenticated, createMessageController.create);

routes.get('/last3messages', getLast3MessagesController.index);

routes.get('/me', ensureAuthenticated, profileUserController.show);

export default routes;
