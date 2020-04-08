const UserService = require('./service');
const UserRepository = require('./repository');

class UserController {
  static async index(req, res) {
    const { page } = req.query;
    const users = await UserRepository.index(page);

    res.ok(users);
  }

  static async create(req, res) {
    const { userId, body } = req;
    const user = await UserService.create(body, userId);

    res.create(user);
  }

  static async update(req, res) {
    const { userId, body } = req;
    const user = await UserService.update(body, userId);

    res.ok(user);
  }

  static async destoy(req, res) {
    const { id } = req.params;
    await UserRepository.destroy(id);

    res.ok();
  }
}

module.exports = UserController;
