const MenuService = require('./service');

class Menu {
  static async index(req, res) {
    const menus = await MenuService.index();

    res.ok(menus);
  }

  static async addDishesToMenu(req, res) {
    const menu = await MenuService.addDishesToMenu(req.body);

    res.ok(menu);
  }
}

module.exports = Menu;
