const { startOfWeek, endOfWeek, addDays } = require('date-fns');
const MenuRepository = require('./repository');

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
