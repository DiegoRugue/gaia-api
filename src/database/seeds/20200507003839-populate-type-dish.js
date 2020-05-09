module.exports = {
  up: queryInterface => queryInterface.bulkInsert('type_dishes',
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
        name: 'Salada',
        created_at: new Date(),
      },
      {
        name: 'Sobremesa',
        created_at: new Date(),
      },
    ], {}),

  down: queryInterface => queryInterface.bulkDelete('type_dishes', null, {}),
};
