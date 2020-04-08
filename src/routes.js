const { Router } = require('express');
const auth = require('./middlewares/auth');

const ping = require('./core/ping');

const UserController = require('./core/user/controller');
const SessionController = require('./core/session/controller');

const routes = new Router();

routes.get('/ping', ping);

routes.post('/session', SessionController.create);

routes.use(auth);

routes.put('/session', SessionController.update);

routes.get('/user', UserController.index);
routes.post('/user', UserController.create);
routes.put('/user', UserController.update);
routes.delete('/user/:id', UserController.destoy);

module.exports = routes;
