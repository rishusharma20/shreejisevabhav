const { body } = require("express-validator");

const registerValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 2, max: 50 })
        .withMessage("Name must be between 2 and 50 characters"),
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please provide a valid email")
        .normalizeEmail(),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .withMessage("Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character")
        .not().isIn(["123456", "password", "admin123", "12345678", "password123"])
        .withMessage("Password is too common"),
    body("phone")
        .optional()
        .trim()
];

const loginValidation = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please provide a valid email")
        .normalizeEmail(),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
];

const updateProfileValidation = [
    body("name")
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage("Name must be between 2 and 50 characters"),
    body("phone")
        .optional()
        .trim()
];

const changePasswordValidation = [
    body("oldPassword")
        .trim()
        .notEmpty()
        .withMessage("Old password is required"),
    body("newPassword")
        .trim()
        .notEmpty()
        .withMessage("New password is required")
        .isLength({ min: 8 })
        .withMessage("New password must be at least 8 characters")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .withMessage("New password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character")
        .not().isIn(["123456", "password", "admin123", "12345678", "password123"])
        .withMessage("Password is too common")
];

const forgotPasswordValidation = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please provide a valid email")
        .normalizeEmail()
];

const resetPasswordValidation = [
    body("token")
        .trim()
        .notEmpty()
        .withMessage("Token is required"),
    body("newPassword")
        .trim()
        .notEmpty()
        .withMessage("New password is required")
        .isLength({ min: 8 })
        .withMessage("New password must be at least 8 characters")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .withMessage("New password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character")
        .not().isIn(["123456", "password", "admin123", "12345678", "password123"])
        .withMessage("Password is too common")
];

module.exports = {
    registerValidation,
    loginValidation,
    updateProfileValidation,
    changePasswordValidation,
    forgotPasswordValidation,
    resetPasswordValidation
};
