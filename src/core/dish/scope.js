const Yup = require('yup');
const HttpError = require('../../utils/errors/HttpError');

class DishScope {
  static async index(query) {
    const schema = Yup.object().shape({
      page: Yup.number().required(),
    });

    await schema.validate(query).catch((err) => {
      throw new HttpError(err.errors, 400);
    });
  }

  static async create(dish) {
    const schema = Yup.object().shape({
      name: Yup.string().required().max(80),
      type: Yup.number().required(),
    });

    await schema.validate(dish).catch((err) => {
      throw new HttpError(err.errors, 400);
    });
  }
}

module.exports = DishScope;
