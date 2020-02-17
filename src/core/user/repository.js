const User = require('.');

class UserRepository {
  static async create(user) {
    const result = await User.create(user);

    return result;
  }

  static async getByEmail(email) {
    const user = await User.findOne({
      where: { email },
    });

    return user;
  }

  static async verifyAdmin(id) {
    const admin = await User.findOne({
      where: { id, admin: true },
      attributes: ['admin'],
    });

    return admin;
  }
}

module.exports = UserRepository;
