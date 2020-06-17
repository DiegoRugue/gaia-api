const ExchangeService = require('./service');
const ExchangeRepository = require('./repository');

class ExchangeController {
  static async index(req, res) {
    const { page, quantityPerPage } = req.query;
    const exchanges = await ExchangeService.index(page, quantityPerPage);

    res.ok(exchanges);
  }

  static async show(req, res) {
    const { params: { menuId }, userId } = req;
    const exchange = await ExchangeRepository.show(menuId, userId);

    res.ok(exchange);
  }

  static async create(req, res) {
    const { body, userId } = req;
    const exchange = await ExchangeService.create(body, userId);

    res.ok(exchange);
  }
}

module.exports = ExchangeController;
