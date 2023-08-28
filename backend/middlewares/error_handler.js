const { HTTP_STATUS_INTERNAL_SERVER_ERROR } = require('http2').constants;

const errorHandler = (err, req, res, next) => {
  const { statusCode = HTTP_STATUS_INTERNAL_SERVER_ERROR, message } = err;
  res
    .status(statusCode)
    .send({
      //  проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === HTTP_STATUS_INTERNAL_SERVER_ERROR
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
};

module.exports = errorHandler;

// 500;
