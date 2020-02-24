const { createSession } = require('./factory');
const SessionService = require('../service');
const SessionRepository = require('../repository');
const HttpError = require('../../../helper/HttpError');

jest.mock('../repository');

describe('Unit session test', () => {
  it('Should be email or password not match', async () => {
    const session = await createSession();

    SessionRepository.findUserByEmail.mockImplementationOnce(() => {
      return false;
    });

    try {
      await SessionService.create(session);
    } catch (err) {
      expect(err).toBeInstanceOf(HttpError);
      expect(err.message).toBe('Email or password not match');
      expect(err.code).toBe(400);
    }
  });
});
