const DishService = require('./service');
const DishScope = require('./scope');

class DishController {
  static async index(req, res) {
    const { query: { page, quantityPerPage }, userId } = req;
    await DishScope.index({ page });
    const dishes = await DishService.index(userId, page, quantityPerPage);

    res.ok(dishes);
  }

  static async create(req, res) {
    const { userId, body } = req;
    await DishScope.create(body);
    const dish = await DishService.create(userId, body);

    res.ok(dish);
  }
}

module.exports = DishController;
