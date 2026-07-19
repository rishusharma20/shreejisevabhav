const { body } = require("express-validator");

const broadcastValidation = [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("message").trim().notEmpty().withMessage("Message is required"),
    body("notificationType")
        .isIn(["FESTIVAL", "OFFERS", "COLLECTIONS", "ANNOUNCEMENTS"])
        .withMessage("Invalid broadcast type. Must be marketing or announcement related.")
];

const updateSettingsValidation = [
    body("emailNotifications").optional().isBoolean(),
    body("orderNotifications").optional().isBoolean(),
    body("paymentNotifications").optional().isBoolean(),
    body("festivalNotifications").optional().isBoolean(),
    body("offerNotifications").optional().isBoolean(),
    body("trackMySevaNotifications").optional().isBoolean(),
    body("marketingNotifications").optional().isBoolean()
];

module.exports = {
    broadcastValidation,
    updateSettingsValidation
};
