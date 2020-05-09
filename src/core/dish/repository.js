const Dish = require('./model');
const TypeDish = require('../typeDish/model');

class DishRepository {
  static async index(page, quantityPerPage) {
    const dishes = await Dish.findAndCountAll({
      include: [
        {
          model: TypeDish,
          attributes: ['id', 'name'],
          as: 'type',
        },
      ],
      limit: quantityPerPage || 5,
      offset: (page - 1) * 5,
      order: [
        ['typeDishId', 'ASC'],
        ['name', 'ASC'],
      ],
      attributes: ['id', 'name'],
    });

    return dishes;
  }
}

module.exports = DishRepository;
