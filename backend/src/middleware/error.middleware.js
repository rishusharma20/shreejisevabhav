const ApiError = require("../utils/ApiError");

const errorHandler = (err, req, res, next) => {
    let error = err;

    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode ? error.statusCode : 500;
        const message = error.message || "Something went wrong";
        error = new ApiError(statusCode, message, error?.errors || {}, err.stack);
    }

    const response = {
        success: error.success,
        statusCode: error.statusCode,
        message: error.message,
        errors: error.errors,
        timestamp: error.timestamp
    };

    if (process.env.NODE_ENV === "development") {
        response.stack = error.stack;
    }

    return res.status(error.statusCode).json(response);
};

module.exports = { errorHandler };
