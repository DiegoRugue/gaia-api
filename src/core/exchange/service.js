const { startOfWeek, endOfWeek } = require('date-fns');
const ExchangeRepository = require('./repository');

class ExchangeService {
  static async index(page, quantityPerPage) {
    const date = new Date();
    const start = startOfWeek(date);
    const end = endOfWeek(date);

    page = page || 1;
    quantityPerPage = quantityPerPage || 10;

    const exchanges = await ExchangeRepository.index(start, end, page, quantityPerPage);

    return exchanges;
  }

  static async create(menu, userId) {
    const { menuId, dishId } = menu;
    const existsExchangeId = await ExchangeRepository.findByMenuUser(menuId, userId);

    if (existsExchangeId) {
      await ExchangeRepository.destroy(existsExchangeId);
    }

    const exchange = await ExchangeRepository.create(menuId, dishId, userId);

    return exchange;
  }
}

module.exports = ExchangeService;
