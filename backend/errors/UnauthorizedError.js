const { HTTP_STATUS_UNAUTHORIZED } = require('http2').constants;

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_UNAUTHORIZED;
  }
}

module.exports = NotFoundError;

// 401;
