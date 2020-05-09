const HttpError = require('../../utils/errors/HttpError');
const DishRepository = require('./repository');
const UserRepository = require('../user/repository');

async function verifyAdmin(id) {
  const isAdmin = await UserRepository.verifyAdmin(id);

  if (!isAdmin) {
    throw new HttpError('Only administrator has access to this feature', 401);
  }
}

class DishService {
  static async index(userId, page, quantityPerPage) {
    await verifyAdmin(userId);

    const dishes = await DishRepository.index(page, quantityPerPage);

    return dishes;
  }
}

module.exports = DishService;
