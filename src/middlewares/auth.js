const { promisify } = require('util');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) res.error('Token not provided', 401);

  const [, token] = authHeader.split(' ');

  try {
    const { id } = await promisify(jwt.verify)(token, process.env.SECRET_KEY);

    req.userId = id;

    next();
  } catch (ex) {
    res.error('Token invalid', 401);
  }
};
