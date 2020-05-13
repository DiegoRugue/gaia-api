const TypeDish = require('./model');

class TypeDishRepository {
  static async index() {
    const types = await TypeDish.findAll({ attributes: ['id', 'name'] });

    return { types };
  }
}

module.exports = TypeDishRepository;
