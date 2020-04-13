const request = require('supertest');

const User = require('../model');
const { createUser, generateToken, createAdmin } = require('./helper');
const app = require('../../../app');
const truncate = require('../../../utils/db/truncate');

describe('Integration user test', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('Should be list all users', async () => {
    const admin = createAdmin();
    const { id } = await User.create(admin);
    const token = generateToken(id);

    const response = await request(app)
      .get('/api/users')
      .set('Authorization',`bearer ${token}`)
      .send()

      expect(response.status).toBe(200);
  });

  it('Should be created user', async () => {
    const admin = createAdmin();
    const { id } = await User.create(admin);
    const token = generateToken(id);

    const user = createUser();

    const response = await request(app)
      .post('/api/user')
      .set('Authorization',`bearer ${token}`)
      .send(user);

    expect(response.status).toBe(201);
  });

  it('Should be updated user', async () => {
    const attrsUser = createUser();
    const { id, password } = await User.create(attrsUser);

    const token = generateToken(id);

    let newAttrsUser = createUser();
    newAttrsUser.oldPassword = password;

    const response = await request(app)
      .put('/api/user')
      .set('Authorization',`bearer ${token}`)
      .send({ id, ...newAttrsUser });

    expect(response.status).toBe(200);
  });

  it('Should be user deleted', async () => {
    const admin = createAdmin();
    const { id } = await User.create(admin);
    const token = generateToken(id);

    const response = await request(app)
      .delete(`/api/user/${id}`)
      .set('Authorization',`bearer ${token}`)
      .send()

      const user = await User.findByPk(id);

      expect(response.status).toBe(200)
      expect(user).toBe(null);
  });
});
