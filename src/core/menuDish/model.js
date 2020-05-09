const Sequelize = require('sequelize');

class MenuDish extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        menu_id: Sequelize.INTEGER,
        dish_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.Menu, { foreignKey: 'menuId' });
    this.belongsTo(models.Dish, { foreignKey: 'dishId' });
  }
}

module.exports = MenuDish;
