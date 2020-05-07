module.exports = {
  up: queryInterface => queryInterface.bulkInsert('types_dishes',
    [
      {
        name: 'Prato Principal',
        created_at: new Date(),
      },
      {
        name: 'Guarnição',
        created_at: new Date(),
      },
      {
        name: 'Sobremesa',
        created_at: new Date(),
      },
    ], {}),

  down: queryInterface => queryInterface.bulkDelete('types_dishes', null, {}),
};
