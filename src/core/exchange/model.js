const Sequelize = require('sequelize');

class Exchange extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      null,
      {
        sequelize,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    this.belongsTo(models.Menu, { foreignKey: 'menuId', as: 'menu' });
    this.belongsTo(models.Dish, { foreignKey: 'dishId', as: 'dish' });
  }
}

module.exports = Exchange;
