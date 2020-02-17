const UserService = require('./service');

class UserController {
  static async create(req, res) {
    const user = await UserService.create(req.body, req.userId);

    res.create(user);
  }
}

module.exports = UserController;
