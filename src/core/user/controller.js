const UserService = require('./service');
const UserScope = require('./scope');

class UserController {
  static async index(req, res) {
    const { query: { page }, userId } = req;
    const users = await UserService.index(page, userId);

    res.ok(users);
  }

  static async show(req, res) {
    const { params: { id }, userId } = req;
    const user = await UserService.show(id, userId);

    res.ok(user);
  }

  static async create(req, res) {
    const { body, userId } = req;
    await UserScope.create(body);

    const user = await UserService.create(body, userId);

    res.create(user);
  }

  static async update(req, res) {
    const { body, userId } = req;
    await UserScope.update(body);
    const user = await UserService.update(body, userId);

    res.ok(user);
  }

  static async destroy(req, res) {
    const { params: { id }, userId } = req;
    await UserService.destroy(id, userId);

    res.ok();
  }
}

module.exports = UserController;
