/* eslint-disable guard-for-in */
const { startOfWeek, endOfWeek, addDays } = require('date-fns');
const MenuRepository = require('./repository');
const DishRepository = require('../dish/repository');
const verifyAdmin = require('../../helper/verifyAdmin');

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

  static async addDishesToMenu(menuData, userId) {
    await verifyAdmin(userId);
    const menu = await this.updateMenu(menuData);

    return menu;
  }

  static async updateMenu(menuData) {
    const { id, dishes } = menuData;

    const dishPromisses = [];
    dishes.forEach(dish => dishPromisses.push(DishRepository.findOrCreate(dish)));

    let menu = await MenuRepository.findById(id);

    const dishesMenu = await Promise.all(dishPromisses);

    await menu.setDishes([]);
    await menu.addDish(dishesMenu);

    menu = await MenuRepository.findMenuWithDishById(id);

    return menu;
  }

  static async removeDishesFromMenu({ menuId, dishId }, userId) {
    await verifyAdmin(userId);

    let menu = await MenuRepository.findById(menuId);

    await menu.removeDish(dishId);

    menu = await MenuRepository.findMenuWithDishById(menuId);

    return menu;
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
