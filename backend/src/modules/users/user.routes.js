const express = require("express");
const {
    uploadProfileImage,
    deleteAccount,
    getAccountSettings,
    getAllUsers,
    blockUser,
    unblockUser,
    deleteUserAdmin
} = require("./user.controller");
const { verifyJWT, isAdmin } = require("../../middleware/auth.middleware");
const upload = require("../../middleware/multer.middleware");

const router = express.Router();

// Protected routes (User)
router.put("/upload-profile-image", verifyJWT, upload.single("profileImage"), uploadProfileImage);
router.delete("/delete-account", verifyJWT, deleteAccount);
router.get("/account-settings", verifyJWT, getAccountSettings);

// Protected routes (Admin)
router.get("/admin/all", verifyJWT, isAdmin, getAllUsers);
router.put("/admin/block/:id", verifyJWT, isAdmin, blockUser);
router.put("/admin/unblock/:id", verifyJWT, isAdmin, unblockUser);
router.delete("/admin/delete/:id", verifyJWT, isAdmin, deleteUserAdmin);

module.exports = router;
