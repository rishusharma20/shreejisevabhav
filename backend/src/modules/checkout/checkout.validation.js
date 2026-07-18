const { body } = require("express-validator");

const setAddressValidation = [
    body("addressId")
        .trim()
        .notEmpty()
        .withMessage("Address ID is required")
        .isMongoId()
        .withMessage("Invalid Address ID format")
];

const setPaymentMethodValidation = [
    body("paymentMethod")
        .trim()
        .notEmpty()
        .withMessage("Payment method is required")
        .isIn(["ONLINE", "CASH"])
        .withMessage("Payment method must be either ONLINE or CASH")
];

module.exports = {
    setAddressValidation,
    setPaymentMethodValidation
};
