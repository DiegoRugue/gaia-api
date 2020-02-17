const HttpError = require('../../helper/HttpError');
const UserRepository = require('./repository');

class UserService {
  static async create(user, userId) {
    const { email } = user;

    const isAdmin = await UserRepository.verifyAdmin(userId);

    if (!isAdmin) {
      throw new HttpError('Only admin can register users', 401);
    }

    const userExists = await UserRepository.getByEmail(email);
    if (userExists) {
      throw new HttpError('User already exists', 409);
    }

    const { name } = await UserRepository.create(user);

    return {
      user: {
        name,
        email,
      },
    };
  }
}

module.exports = UserService;
