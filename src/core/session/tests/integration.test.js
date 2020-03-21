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
    const user = await createUser();

    const { id } = await User.create(user);

    const { email, password } = user;

    const response = await request(app)
      .post('/api/session')
      .send({
        email,
        password
      });

    const userToken = generateUserToken(id);
    const { body: { token } } = response;

    expect(response.status).toBe(200);
    expect(token).toBe(userToken);
  });
});
