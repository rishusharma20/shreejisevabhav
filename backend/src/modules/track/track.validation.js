const { body } = require("express-validator");

const validStatuses = [
    "PAYMENT_SUCCESS",
    "PREPARING",
    "PACKAGING",
    "SHIPPED",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
    "COMPLETED"
];

const updateStatusValidation = [
    body("status")
        .trim()
        .notEmpty()
        .withMessage("Status is required")
        .isIn(validStatuses)
        .withMessage(`Status must be one of: ${validStatuses.join(", ")}`)
];

const updateDeliveryValidation = [
    body("trackingNumber")
        .trim()
        .notEmpty()
        .withMessage("Tracking number is required"),
    body("deliveryPartner")
        .trim()
        .notEmpty()
        .withMessage("Delivery partner name is required"),
    body("estimatedDelivery")
        .optional()
        .isISO8601()
        .withMessage("Estimated delivery must be a valid date")
];

module.exports = {
    updateStatusValidation,
    updateDeliveryValidation
};
