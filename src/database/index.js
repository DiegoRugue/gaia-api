const Sequelize = require('sequelize');
const config = require('../config/database');

const User = require('../core/user/model');
const TypeDish = require('../core/typeDish/model');
const Dish = require('../core/dish/model');
const Menu = require('../core/menu/model');
const MenuDish = require('../core/menuDish/model');

const models = [User, TypeDish, Dish, Menu, MenuDish];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(config);

    models.forEach(model => model.init(this.connection));
    models.forEach(model => model.associate && model.associate(this.connection.models));
  }
}

module.exports = new Database();
