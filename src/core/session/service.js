const jwt = require('jsonwebtoken');
const HttpError = require('../../utils/errors/HttpError');
const SessionRepository = require('./repository');

function generateToken(user) {
  const { id, name, email } = user;

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

class SessionService {
  static async create(session) {
    const { email, password } = session;

    const user = await SessionRepository.findUserByEmail(email);

    if (!user || !(await user.checkPassword(password))) {
      throw new HttpError('Email or password not match', 400);
    }

    return generateToken(user);
  }

  static async update(id) {
    const user = await SessionRepository.findUserById(id);

    if (!user) {
      throw new HttpError('User not exists', 400);
    }

    return generateToken(user);
  }
}

module.exports = SessionService;
