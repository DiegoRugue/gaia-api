const { Op } = require('sequelize');
const Menu = require('./model');

class MenuRepository {
  static async index(startDate, EndDate) {
    const menus = await Menu.findAll({
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
    // await Menu.destroy({
    //   where: {
    //     id: {
    //       [Op.between]: [0, 100],
    //     },
    //   },
    // });
  }
}

module.exports = MenuRepository;
