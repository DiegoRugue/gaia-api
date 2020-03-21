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

routes.post('/user', auth, UserController.create);
routes.put('/user', auth, UserController.update);

module.exports = routes;
