const HttpError = require('../../utils/errors/HttpError');
const UserRepository = require('./repository');

async function verifyUserAccess(userId, id) {
  if (id == userId) {
    return true;
  }

  const isAdmin = await UserRepository.verifyAdmin(userId);

  if (!isAdmin) {
    throw new HttpError('Only the owner or administrator user has access to this feature', 401);
  }

  return true;
}

class UserService {
  static async index(page, userId) {
    await verifyUserAccess(userId);

    const users = await UserRepository.index(page);

    return { users };
  }

  static async show(userId, id) {
    await verifyUserAccess(userId, id);

    const user = await UserRepository.show(id);

    return { user };
  }

  static async create(user, userId) {
    const { email } = user;

    await verifyUserAccess(userId);

    const userExists = await UserRepository.getByEmail(email);
    if (userExists) {
      throw new HttpError('User already exists', 409);
    }

    const { id, name } = await UserRepository.create(user);

    return {
      user: {
        id,
        name,
        email,
      },
    };
  }

  static async update(userData, userId) {
    const { id, oldPassword, email } = userData;

    await verifyUserAccess(userId, id);

    const user = await UserRepository.getById(id);

    if (!user) {
      throw new HttpError('User recently deleted', 400);
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      throw new HttpError("Password doesn't match", 400);
    }

    if (email && email !== user.email && await UserRepository.getByEmail(email)) {
      throw new HttpError('Email already exists try another one', 400);
    }

    await user.update(userData);

    return {
      user: {
        id,
        name: user.name,
        email: user.email,
      },
    };
  }

  static async destroy(id, userId) {
    await verifyUserAccess(userId);
    await UserRepository.destroy(id);
  }
}

module.exports = UserService;
