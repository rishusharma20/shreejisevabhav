const express = require("express");
const { filterProducts } = require("./filter.controller");
const { validate } = require("../../middleware/validate.middleware");
const { filterValidation } = require("./search.validation");

const router = express.Router();

// Public Filter Routes
router.get("/products", filterValidation, validate, filterProducts);

module.exports = router;
