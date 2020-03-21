const { createUser } = require('./helper');
const SessionService = require('../service');
const SessionRepository = require('../repository');

jest.mock('../repository');

describe('Unit session test', () => {
  it('Should be email or password not match', async () => {
    const session = createUser();

    SessionRepository.findUserByEmail.mockImplementationOnce(() => {
      return false;
    });

    try {
      await SessionService.create(session);
    } catch (err) {
      expect(err.message).toBe('Email or password not match');
      expect(err.code).toBe(400);
    }
  });

  it('Should be user not exists', async () => {
    SessionRepository.findUserById.mockImplementationOnce(() => {
      return false;
    });

    try {
      await SessionService.update(1);
    } catch (err) {
      expect(err.message).toBe('User not exists');
      expect(err.code).toBe(400);
    }
  });
});
