const request = require('supertest');

const { createUser, generateUserToken } = require('./helper');
const User = require('../../user/model');
const app = require('../../../app');
const truncate = require('../../../utils/db/truncate');

describe('Integration session test', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('Should be created session', async () => {
    const userData = createUser();
    const { id, name, email, password } = await User.create(userData);

    const response = await request(app)
      .post('/api/session')
      .send({
        email,
        password
      });

    const userToken = generateUserToken(id);
    const { body: { token, user } } = response;

    expect(response.status).toBe(200);
    expect(token).toBe(userToken);
    expect(user.name).toBe(name);
    expect(user.email).toBe(email);
    expect(user.admin).toBe(false);
  });

  it('Should be updated session', async () => {
    const userData = createUser();
    const { id, name, email } = await User.create(userData);
    
    const userToken = generateUserToken(id);

    const response = await request(app)
      .put('/api/session')
      .set('Authorization',`bearer ${userToken}`)
      .send();

    const { body: { token, user } } = response;

    expect(response.status).toBe(200);
    expect(token).toBe(userToken);
    expect(user.name).toBe(name);
    expect(user.email).toBe(email);
    expect(user.admin).toBe(false);
  });
});
