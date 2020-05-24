const Sequelize = require('sequelize');

class Dish extends Sequelize.Model {
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

  static associate(models) {
    this.belongsTo(models.TypeDish, { foreignKey: 'typeDishId', as: 'type' });
    this.belongsToMany(models.Menu, { through: 'MenuDishes', foreignKey: 'menuId', as: 'menus' });
  }
}

module.exports = Dish;
