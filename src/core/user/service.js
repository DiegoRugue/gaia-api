const HttpError = require('../../utils/errors/HttpError');
const UserRepository = require('./repository');

async function verifyAdmin(id) {
  const isAdmin = await UserRepository.verifyAdmin(id);

  if (!isAdmin) {
    throw new HttpError('Only admin users have access to this service', 401);
  }

  return true;
}

class UserService {
  static async index(page, userId) {
    await verifyAdmin(userId);

    const users = await UserRepository.index(page);

    return { users };
  }

  static async create(user, userId) {
    const { email } = user;

    await verifyAdmin(userId);

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

  static async update(userData) {
    const { id, oldPassword } = userData;

    const user = await UserRepository.getById(id);

    if (!user) {
      throw new HttpError('User recently deleted', 400);
    }

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

  static async destroy(id, userId) {
    await verifyAdmin(userId);
    await UserRepository.destroy(id);
  }
}

module.exports = UserService;
