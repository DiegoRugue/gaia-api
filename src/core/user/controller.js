const UserService = require('./service');

class UserController {
  static async index(req, res) {
    const { query: { page }, userId } = req;
    const users = await UserService.index(page, userId);

    res.ok(users);
  }

  static async create(req, res) {
    const { body, userId } = req;
    const user = await UserService.create(body, userId);

    res.create(user);
  }

  static async update(req, res) {
    const { body } = req;
    const user = await UserService.update(body);

    res.ok(user);
  }

  static async destroy(req, res) {
    const { params: { id }, userId } = req;
    await UserService.destroy(id, userId);

    res.ok();
  }
}

module.exports = UserController;
