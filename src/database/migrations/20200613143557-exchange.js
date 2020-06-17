module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('exchanges', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    menu_id: {
      type: Sequelize.INTEGER,
      references: { model: 'menus', key: 'id' },
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
      allowNull: false,
    },
    dish_id: {
      type: Sequelize.INTEGER,
      references: { model: 'dishes', key: 'id' },
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  }),

  down: queryInterface => queryInterface.dropTable('exchanges'),
};
