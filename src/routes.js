const { Router } = require('express');
const auth = require('./middlewares/auth');

const ping = require('./core/ping');

const UserController = require('./core/user/controller');
const SessionController = require('./core/session/controller');

const routes = new Router();

routes.get('/ping', ping);

routes.post('/session', SessionController.create);

routes.use(auth);

routes.get('/session', SessionController.refresh);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.create);
routes.put('/users', UserController.update);
routes.delete('/users/:id', UserController.destroy);

module.exports = routes;
