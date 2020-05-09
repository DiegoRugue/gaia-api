module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('dishes', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(80),
      allowNull: false,
    },
    type_dish_id: {
      type: Sequelize.INTEGER,
      references: { model: 'type_dishes', key: 'id' },
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

  down: queryInterface => queryInterface.dropTable('dishes'),
};
