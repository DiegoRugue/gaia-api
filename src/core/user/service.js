const HttpError = require('../../utils/errors/HttpError');
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

  static async update(userData, id) {
    const user = await UserRepository.getById(id);

    if (!user) {
      throw new HttpError('User recently deleted', 400);
    }

    const { oldPassword } = userData;

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      throw new HttpError("Password doesn't match", 400);
    }

    const { name, email } = UserRepository.update(id, userData);

    return {
      user: {
        name,
        email,
      },
    };
  }
}

module.exports = UserService;
