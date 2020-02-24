const request = require('supertest');

const User = require('..');
const { createUser, generateToken, createAdmin } = require('./factory');
const app = require('../../../app');
const truncate = require('../../../database/truncate');

describe('Integration user test', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('Should be created user', async () => {
    const admin = await createAdmin();
    const { id } = await User.create(admin);
    const token = generateToken(id);

    const user = await createUser();

    const response = await request(app)
      .post('/api/user')
      .set('Authorization',`bearer ${token}`)
      .send(user);

    expect(response.status).toBe(201);
  });

  it('Should be updated user', async () => {
    const attrsUser = await createUser();
    const user = await User.create(attrsUser);

    const { id } = user;
    const token = generateToken(id);

    let newAttrsUser = await createUser();
    newAttrsUser.oldPassword = user.password;

    const response = await request(app)
      .put('/api/user')
      .set('Authorization',`bearer ${token}`)
      .send(newAttrsUser);

    expect(response.status).toBe(200);
  });
});


