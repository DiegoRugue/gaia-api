module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('types_dishes', {
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
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  }),

  down: queryInterface => queryInterface.dropTable('types_dishes'),
};
