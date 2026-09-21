const express = require("express");
const router = express.Router();
const { serveImage } = require("../controllers/image.controller");

// Public route to stream product and collection images
router.get("/:fileId", serveImage);

module.exports = router;
