const express = require("express");
const {
    registerUser,
    loginUser,
    logoutUser,
    getProfile,
    updateProfile,
    changePassword
} = require("./auth.controller");
const { verifyJWT } = require("../../middleware/auth.middleware");
const { validate } = require("../../middleware/validate.middleware");
const {
    registerValidation,
    loginValidation,
    updateProfileValidation,
    changePasswordValidation
} = require("./auth.validation");

const router = express.Router();

// Public routes
router.post("/register", registerValidation, validate, registerUser);
router.post("/login", loginValidation, validate, loginUser);

// Protected routes (Requires Authentication)
router.post("/logout", verifyJWT, logoutUser);
router.get("/profile", verifyJWT, getProfile);
router.put("/update-profile", verifyJWT, updateProfileValidation, validate, updateProfile);
router.put("/change-password", verifyJWT, changePasswordValidation, validate, changePassword);

module.exports = router;
