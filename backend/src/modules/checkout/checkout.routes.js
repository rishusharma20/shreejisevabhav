const express = require("express");
const {
    createCheckoutSession,
    getCheckoutSession,
    setAddress,
    setPaymentMethod,
    cancelCheckoutSession,
    getOrderSummary
} = require("./checkout.controller");
const { verifyJWT } = require("../../middleware/auth.middleware");
const { validate } = require("../../middleware/validate.middleware");
const { setAddressValidation, setPaymentMethodValidation } = require("./checkout.validation");

const router = express.Router();

// ALL checkout routes require authentication
router.use(verifyJWT);

router.post("/create", createCheckoutSession);
router.get("/", getCheckoutSession);
router.put("/address", setAddressValidation, validate, setAddress);
router.put("/payment-method", setPaymentMethodValidation, validate, setPaymentMethod);
router.get("/order-summary", getOrderSummary);
router.delete("/cancel", cancelCheckoutSession);

module.exports = router;
