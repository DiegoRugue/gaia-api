const UserRepository = require('../core/user/repository');
const HttpError = require('../utils/errors/HttpError');

module.exports = async (id) => {
  const isAdmin = await UserRepository.verifyAdmin(id);

  if (!isAdmin) {
    throw new HttpError('Only administrator has access to this feature', 401);
  }
};
