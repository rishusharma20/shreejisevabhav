const express = require("express");
const router = express.Router();
const { getGallery, addGalleryImage, updateGalleryImage, deleteGalleryImage } = require("./gallery.controller");
const { verifyJWT, isAdmin } = require("../../middleware/auth.middleware");
const { uploadGallery } = require("../../middleware/multer.middleware");

// Public route
router.get("/", getGallery);

// Admin routes
router.use(verifyJWT);
router.use(isAdmin);

router.post("/", uploadGallery.single("image"), addGalleryImage);
router.put("/:id", uploadGallery.single("image"), updateGalleryImage);
router.delete("/:id", deleteGalleryImage);

module.exports = router;
