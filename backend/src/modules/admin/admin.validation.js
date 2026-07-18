const { body, query } = require("express-validator");

const blockUserValidation = [
    body("userId")
        .trim()
        .notEmpty()
        .withMessage("User ID is required")
        .isMongoId()
        .withMessage("Invalid User ID format")
];

const reportQueryValidation = [
    query("timeframe")
        .optional()
        .isIn(["DAILY", "WEEKLY", "MONTHLY", "ALL_TIME"])
        .withMessage("Timeframe must be one of: DAILY, WEEKLY, MONTHLY, ALL_TIME")
];

module.exports = {
    blockUserValidation,
    reportQueryValidation
};
