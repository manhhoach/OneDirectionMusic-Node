const responseSuccess = (data, message = "") => {
  return {
    success: true,
    message,
    data,
  };
};

const responseWithError = (err, message = "") => {
  if (err && err.message === "Validation error" && err.errors && err.errors.length > 0) {
    message = err.errors[0].message;
  } else if (err && err.message) {
    message = err.message;
  } else if (typeof err === "string") {
    message = err;
  }

  return {
    success: false,
    message,
    data: null,
  };
};

module.exports = { responseSuccess, responseWithError };