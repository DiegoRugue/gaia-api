const TypeDishRepository = require('./repository');

class TypeDishController {
  static async index(req, res) {
    const types = await TypeDishRepository.index();

    res.ok(types);
  }
}

module.exports = TypeDishController;
