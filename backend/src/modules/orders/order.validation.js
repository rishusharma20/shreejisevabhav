const { body } = require("express-validator");

const validAdminStatuses = [
    "ACCEPTED",
    "PROCESSING",
    "PACKAGING",
    "SHIPPED",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
    "COMPLETED",
    "CANCELLED",
    "RETURNED",
    "REFUNDED"
];

const updateOrderStatusValidation = [
    body("status")
        .trim()
        .notEmpty()
        .withMessage("Status is required")
        .isIn(validAdminStatuses)
        .withMessage(`Status must be one of: ${validAdminStatuses.join(", ")}`)
];

module.exports = {
    updateOrderStatusValidation
};
