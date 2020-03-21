const User = require('../user/model');

class SessionRepository {
  static async findUserByEmail(email) {
    const user = await User.findOne({ where: { email } });

    return user;
  }

  static async findUserById(id) {
    const user = await User.findByPk(id);

    return user;
  }
}

module.exports = SessionRepository;
