const AppError = require("./../util/AppError");

const handleDevError = (err, res) => {
  res.status(err.statusCode).json({
    state: err.state,
    message: err.message,
    err,
    stack: err.stack,
  });
};

const handleCastErrorDB = (err) => {
  const message = `invalid : ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFields = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleProdError = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      state: err.state,
      message: err.message,
    });
  }
  res.status(500).json({
    state: "error",
    message: "Oops somethinf went wrong",
  });
};

const handleJWTError = () => {
  new AppError("Invalid token. Please log in again!", 401);
};

const handleJWTExpiredError = () => {
  new AppError("Your token has expired! Please log in again.", 401);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.StatusCode || 500;
  err.state = err.state || "error";

  if (process.env.NODE_ENV === "development") {
    handleDevError(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };

    error.name = err.name;
    error.code = err.code;

    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFields(error);
    if (error.name === "ValidatorError") error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

    handleProdError(error, res);
  }
};
