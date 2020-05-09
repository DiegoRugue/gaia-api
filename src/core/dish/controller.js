const DishService = require('./service');

class DishController {
  static async index(req, res) {
    const { query: { page, quantityPerPage }, userId } = req;
    const dishes = await DishService.index(userId, page, quantityPerPage);

    res.ok(dishes);
  }
}

module.exports = DishController;
