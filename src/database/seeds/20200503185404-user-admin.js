const { hashSync } = require('bcryptjs');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('users',
    [
      {
        name: 'Diego Admin',
        email: 'diego@teste.com',
        password_hash: hashSync('1234', 8),
        admin: true,
        created_at: new Date(),
      },
    ], {}),

  down: queryInterface => queryInterface.bulkDelete('users', null, {}),
};
