const { Op } = require('sequelize');
const Menu = require('./model');
const Dish = require('../dish/model');
const TypeDish = require('../typeDish/model');

class MenuRepository {
  static async index(startDate, EndDate) {
    const menus = await Menu.findAll({
      include: [{
        model: Dish,
        attributes: ['id', 'name'],
        through: {
          attributes: [],
        },
        as: 'dishes',
        include: [{
          model: TypeDish,
          attributes: ['id', 'name'],
          as: 'type',
        }],
      }],
      where: {
        date: {
          [Op.between]: [startDate, EndDate],
        },
      },
      order: ['date'],
      attributes: ['id', 'date'],
    });
    return menus;
  }

  static async createMenusOfWeek(days) {
    const menus = await Menu.bulkCreate(days);
    return menus;
  }

  static async findById(id) {
    const menu = await Menu.findByPk(id);
    return menu;
  }

  static async findMenuWithDishById(id) {
    const menu = await Menu.findByPk(id, {
      include: [{
        model: Dish,
        attributes: ['id', 'name'],
        as: 'dishes',
        through: {
          attributes: [],
        },
        include: [{
          model: TypeDish,
          attributes: ['id', 'name'],
          as: 'type',
        }],
      }],
      attributes: ['id', 'date'],
    });
    return menu;
  }
}

module.exports = MenuRepository;
