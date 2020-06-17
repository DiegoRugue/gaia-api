const { Op } = require('sequelize');
const Exchange = require('./model');
const Dish = require('../dish/model');
const Menu = require('../menu/model');
const User = require('../user/model');

class ExchangeRepository {
  static async index(startDate, EndDate, page, quantityPerPage) {
    const exchanges = await Exchange.findAndCountAll({
      include: [{
        model: Dish,
        attributes: ['id', 'name'],
        as: 'dish',
      },
      {
        model: Menu,
        attributes: ['id', 'date'],
        as: 'menu',
        where: {
          date: {
            [Op.between]: [startDate, EndDate],
          },
        },
      },
      {
        model: User,
        attributes: ['id', 'name'],
        as: 'user',
      }],
      limit: quantityPerPage,
      offset: (page - 1) * quantityPerPage,
      order: ['id'],
      attributes: ['id'],
    });
    return exchanges;
  }

  static async show(menuId, userId) {
    const exchange = await Exchange.findOne({
      include: [{
        model: Dish,
        attributes: ['id', 'name'],
        as: 'dish',
      }],
      where: { menuId, userId },
      attributes: ['id'],
    });

    return exchange;
  }

  static async create(menuId, dishId, userId) {
    const exchange = await Exchange.create({ menuId, dishId, userId });
    return exchange;
  }

  static async findByMenuUser(menuId, userId) {
    const { id } = await Exchange.findOne({ where: { menuId, userId }, attributes: ['id'] });
    return id;
  }

  static async destroy(id) {
    await Exchange.destroy({ where: { id } });
  }
}

module.exports = ExchangeRepository;
