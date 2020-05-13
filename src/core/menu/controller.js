const MenuService = require('./service');

class Menu {
  static async index(req, res) {
    const menus = await MenuService.index();

    res.ok(menus);
  }
}

module.exports = Menu;
