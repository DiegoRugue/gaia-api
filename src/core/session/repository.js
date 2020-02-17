const User = require('../user');

class SessionRepository {
  static async findUserByEmail(email) {
    const user = await User.findOne({ where: { email } });

    return user;
  }
}

module.exports = SessionRepository;
