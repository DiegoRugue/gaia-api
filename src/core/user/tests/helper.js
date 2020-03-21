const jwt = require('jsonwebtoken');
const faker = require('faker');
const { factory } = require('factory-girl');
const User = require('../model');

const userFactory = factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

const adminFactory = factory.define('Admin', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  admin: true,
});

function createUser() {
  return Promise.resolve(userFactory.attrs());
}

function createAdmin() {
  return Promise.resolve(adminFactory.attrs());
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
