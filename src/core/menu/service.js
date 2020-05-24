/* eslint-disable guard-for-in */
const Sequelize = require('sequelize');
const { startOfWeek, endOfWeek, addDays } = require('date-fns');
const config = require('../../config/database');
const MenuRepository = require('./repository');
const DishRepository = require('../dish/repository');

class MenuService {
  static async index() {
    const date = new Date();
    const start = startOfWeek(date);
    const end = endOfWeek(date);

    let menus = await this.findMenuOfWeek(start, end);

    if (!menus.length) {
      menus = await this.createMenusOfWeek(start, end);
    }

    return menus;
  }

  static async addDishesToMenu(menuData) {
    const sequelize = new Sequelize(config);
    const result = await sequelize.transaction(async transaction => {
      const { id, dishes } = menuData;

      const dishPromisses = [];
      dishes.forEach(dish => dishPromisses.push(DishRepository.findOrCreate(dish)));

      let menu = await MenuRepository.findById(id);

      const dishesMenu = await Promise.all(dishPromisses);

      await menu.addDish(dishesMenu, { transaction });

      menu = await MenuRepository.findMenuWithDishById(id, transaction);

      return menu;
    });
    return result;
  }

  static async createMenusOfWeek(start, end) {
    const days = [];
    const friday = addDays(start, 5);

    let currentDay = addDays(start, 1);

    while (currentDay <= friday) {
      days.push({
        date: currentDay,
      });
      currentDay = addDays(currentDay, 1);
    }

    await MenuRepository.createMenusOfWeek(days);

    const menus = await this.findMenuOfWeek(start, end);

    return menus;
  }

  static async findMenuOfWeek(start, end) {
    const menus = await MenuRepository.index(start, end);
    return menus;
  }
}

module.exports = MenuService;
