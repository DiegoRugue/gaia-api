module.exports = {
  up: queryInterface => queryInterface.bulkInsert('dishes',
    [
      {
        name: 'Frango',
        created_at: new Date(),
        type_dish_id: 1,
      },
      {
        name: 'Bife',
        created_at: new Date(),
        type_dish_id: 1,
      },
      {
        name: 'Omelete',
        created_at: new Date(),
        type_dish_id: 1,
      },
      {
        name: 'Batata Frita',
        created_at: new Date(),
        type_dish_id: 2,
      },
      {
        name: 'Tomate',
        created_at: new Date(),
        type_dish_id: 3,
      },
      {
        name: 'Pudim',
        created_at: new Date(),
        type_dish_id: 4,
      },
    ], {}),

  down: queryInterface => queryInterface.bulkDelete('dishes', null, {}),
};
