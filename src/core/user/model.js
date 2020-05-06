const Sequelize = require('sequelize');
const { hash, compare } = require('bcryptjs');

class User extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        oldPassword: Sequelize.VIRTUAL,
        admin: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      },
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await hash(user.password, 8);
      }

      return this;
    });
  }

  checkPassword(password) {
    return compare(password, this.password_hash);
  }
}

module.exports = User;
