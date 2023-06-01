const { HTTP_STATUS_UNAUTHORIZED } = require('../utils/constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = HTTP_STATUS_UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
