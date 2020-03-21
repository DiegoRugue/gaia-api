const jwt = require('jsonwebtoken');
const faker = require('faker');
const { factory } = require('factory-girl');
const User = require('../../user/model');

const userFactory = factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

const sessionFactory = factory.define('Session', User, {
  email: faker.internet.email(),
  password: faker.internet.password(),
});

function createUser() {
  return Promise.resolve(userFactory.attrs());
}

function createSession() {
  return Promise.resolve(sessionFactory.attrs());
}

function generateUserToken(id) {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: '1d',
  });
}

module.exports = {
  createUser,
  createSession,
  generateUserToken,
};
