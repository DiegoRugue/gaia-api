const { Router } = require('express');
const auth = require('./middlewares/auth');

const ping = require('./core/ping');

const UserController = require('./core/user/controller');
const SessionController = require('./core/session/controller');
const DishController = require('./core/dish/controller');
const TypeDishController = require('./core/typeDish/controller');
const MenuController = require('./core/menu/controller');

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

routes.get('/dishes', DishController.index);
routes.post('/dishes', DishController.create);

routes.get('/types-dishes', TypeDishController.index);

routes.get('/menus', MenuController.index);

module.exports = routes;
