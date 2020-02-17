const request = require('supertest');
const app = require('../../app');

describe('Ping Route', () => {
  it('Should be received status code 200', async () => {
    const response = await request(app)
      .get('/api/ping');

    expect(response.status).toBe(200);
  });
});
