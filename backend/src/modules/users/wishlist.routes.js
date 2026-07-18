const express = require("express");
const {
    addToWishlist,
    removeFromWishlist,
    getWishlist
} = require("./wishlist.controller");
const { verifyJWT } = require("../../middleware/auth.middleware");
const { validate } = require("../../middleware/validate.middleware");
const { wishlistValidation } = require("./user.validation");

const router = express.Router();

router.use(verifyJWT); // Protect all wishlist routes

router.post("/add", wishlistValidation, validate, addToWishlist);
router.delete("/remove", wishlistValidation, validate, removeFromWishlist);
router.get("/", getWishlist);

module.exports = router;
