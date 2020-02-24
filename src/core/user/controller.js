const UserService = require('./service');

class UserController {
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
}

module.exports = UserController;
