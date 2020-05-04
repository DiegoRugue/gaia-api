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
      .send();

    const { users: [ user ]} = response.body;

    expect(response.status).toBe(200);
    expect(user.id).toBe(id);
    expect(user.name).toBe(admin.name);
    expect(user.email).toBe(admin.email);
  });

  it('Should be show user', async () => {
    const admin = createAdmin();
    const { id } = await User.create(admin);
    const token = generateToken(id);

    const response = await request(app)
      .get(`/api/users/${id}`)
      .set('Authorization',`bearer ${token}`)
      .send();

    const { user } = response.body;

    expect(response.status).toBe(200);
    expect(user.id).toBe(id);
    expect(user.name).toBe(admin.name);
    expect(user.email).toBe(admin.email);
  });

  it('Should be created user', async () => {
    const admin = createAdmin();
    const { id } = await User.create(admin);
    const token = generateToken(id);

    const user = createUser();

    const response = await request(app)
      .post('/api/users')
      .set('Authorization',`bearer ${token}`)
      .send(user);

    const { user: userRes } = response.body;
    const { id: idCreated } = await User.findOne({ where: { email: user.email } });

    expect(response.status).toBe(201);
    expect(userRes.id).toBe(idCreated);
    expect(userRes.name).toBe(user.name);
    expect(userRes.email).toBe(user.email);
  });

  it('Should be updated user', async () => {
    const attrsUser = createUser();
    const { id, password } = await User.create(attrsUser);

    const token = generateToken(id);

    let newAttrsUser = createUser();
    newAttrsUser.oldPassword = password;

    const response = await request(app)
      .put('/api/users')
      .set('Authorization',`bearer ${token}`)
      .send({ id, ...newAttrsUser });

    const { user } = response.body;
    const updatedUser = await User.findByPk(id);
    const changedPassword = await updatedUser.checkPassword(newAttrsUser.password);

    expect(response.status).toBe(200);
    expect(user.id).toBe(id);
    expect(user.name).toBe(newAttrsUser.name);
    expect(user.email).toBe(newAttrsUser.email);
    expect(changedPassword).toBe(true);
  });

  it('Should be user deleted', async () => {
    const admin = createAdmin();
    const { id } = await User.create(admin);
    const token = generateToken(id);

    const response = await request(app)
      .delete(`/api/users/${id}`)
      .set('Authorization',`bearer ${token}`)
      .send();

    const user = await User.findByPk(id);

    expect(response.status).toBe(200);
    expect(user).toBe(null);
  });
});
