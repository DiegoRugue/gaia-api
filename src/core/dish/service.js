const DishRepository = require('./repository');
const verifyAdmin = require('../../helper/verifyAdmin');

class DishService {
  static async index(userId, page, quantityPerPage) {
    await verifyAdmin(userId);

    const dishes = await DishRepository.index(page, quantityPerPage);

    return dishes;
  }

  static async create(userId, dataDish) {
    await verifyAdmin(userId);

    const { id, name, type } = await DishRepository.findOrCreate(dataDish);

    return {
      id,
      name,
      type,
    };
  }
}

module.exports = DishService;
