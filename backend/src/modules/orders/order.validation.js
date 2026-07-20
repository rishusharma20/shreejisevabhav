const { body } = require("express-validator");

const validAdminStatuses = [
    "PAYMENT_PENDING",
    "UNDER_VERIFICATION",
    "PAYMENT_APPROVED",
    "PAYMENT_REJECTED",
    "ORDER_CONFIRMED",
    "PREPARING",
    "PACKAGING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED"
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
