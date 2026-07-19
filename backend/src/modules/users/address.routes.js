const express = require("express");
const {
    addAddress,
    getAddresses,
    updateAddress,
    deleteAddress,
    setDefaultAddress
} = require("./address.controller");
const { verifyJWT } = require("../../middleware/auth.middleware");
const { validate } = require("../../middleware/validate.middleware");
const { addressValidation } = require("./user.validation");

const router = express.Router();

router.use(verifyJWT); // Protect all address routes

router.post("/add", addressValidation, validate, addAddress);
router.get("/", getAddresses);
router.put("/update/:id", addressValidation, validate, updateAddress);
router.delete("/delete/:id", deleteAddress);
router.put("/default/:id", setDefaultAddress);

module.exports = router;
