const Sequelize = require('sequelize');

class TypesDishes extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
      },
    );
  }
}

module.exports = TypesDishes;
