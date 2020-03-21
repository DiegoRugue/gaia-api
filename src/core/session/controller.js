const SessionService = require('./service');

class SessionController {
  static async create(req, res) {
    const session = await SessionService.create(req.body);

    res.ok(session);
  }

  static async update(req, res) {
    const session = await SessionService.update(req.userId);

    res.ok(session);
  }
}

module.exports = SessionController;
