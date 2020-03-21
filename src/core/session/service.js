const jwt = require('jsonwebtoken');
const HttpError = require('../../utils/errors/HttpError');
const SessionRepository = require('./repository');

class SessionService {
  static async create(session) {
    const { email, password } = session;

    const user = await SessionRepository.findUserByEmail(email);

    if (!user || !(await user.checkPassword(password))) {
      throw new HttpError('Email or password not match', 400);
    }

    const { id, name } = user;

    return {
      user: {
        name,
        email,
      },
      token: jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: '1d',
      }),
    };
  }
}

module.exports = SessionService;
