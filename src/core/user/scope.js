const Yup = require('yup');
const HttpError = require('../../utils/errors/HttpError');

class UserScope {
  static async create(user) {
    const schema = Yup.object().shape({
      name: Yup.string().required().max(80),
      email: Yup.string().required().email().max(100),
      password: Yup.string().required(),
    });

    await schema.validate(user).catch((err) => {
      throw new HttpError(err.errors, 400);
    });
  }

  static async update(user) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      password: Yup.string(),
      oldPassword: Yup.string()
        .when('password', (password, field) => (password ? field.required() : field)),
    });

    await schema.validate(user).catch((err) => {
      throw new HttpError(err.errors, 400);
    });
  }
}

module.exports = UserScope;
