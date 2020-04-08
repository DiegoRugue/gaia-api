const User = require('./model');

class UserRepository {
  static async index(page) {
    const users = await User.findAll({
      limit: 10,
      offset: page,
      attributes: ['id', 'name', 'email'],
    });

    return { users: { users } };
  }

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

  static async getById(id) {
    const user = await User.findOne({
      where: { id },
    });

    return user;
  }

  static async update(userData, id) {
    const user = await User.update(userData, { where: id });

    return user;
  }

  static async destroy(id) {
    await User.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = UserRepository;
