const Sequelize = require('sequelize');

class TypeDish extends Sequelize.Model {
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

module.exports = TypeDish;
