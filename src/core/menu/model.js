const Sequelize = require('sequelize');

class Menu extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
      },
      {
        sequelize,
      },
    );
  }

  static associate(models) {
    this.belongsToMany(models.Dish, { through: 'MenuDish', foreignKey: 'dishId', as: 'dish' });
  }
}

module.exports = Menu;
