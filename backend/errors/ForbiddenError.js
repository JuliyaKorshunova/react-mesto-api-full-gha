const { HTTP_STATUS_FORBIDDEN } = require('http2').constants;

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_FORBIDDEN;
  }
}

module.exports = NotFoundError;

// 403;
