const jwt = require('jsonwebtoken');
const faker = require('faker');

function createUser() {
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    admin: false,
  };
}

function createAdmin() {
  return {
    ...createUser(),
    admin: true,
  };
}

function generateToken(id) {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: '1d',
  });
}

module.exports = {
  createUser,
  generateToken,
  createAdmin,
};
