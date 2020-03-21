const DomainError = require('./DomainError');

class HttpError extends DomainError {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

module.exports = HttpError;
