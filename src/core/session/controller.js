const SessionService = require('./service');

class SessionController {
  static async create(req, res) {
    const session = await SessionService.create(req.body);

    res.ok(session);
  }
}

module.exports = SessionController;
