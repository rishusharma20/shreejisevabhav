const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const { errorHandler } = require("./src/middleware/error.middleware");
const ApiResponse = require("./src/utils/ApiResponse");

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

// Body Parsing Middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Logging Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan("dev"));
}

// Routes Import
const authRouter = require('./src/modules/auth/auth.routes');
const userRouter = require('./src/modules/users/user.routes');
const addressRouter = require('./src/modules/users/address.routes');
const wishlistRouter = require('./src/modules/users/wishlist.routes');
const collectionRouter = require('./src/modules/collections/collection.routes');
const productRouter = require('./src/modules/products/product.routes');
const variantRouter = require('./src/modules/products/variant.routes');
const searchRouter = require('./src/modules/search/search.routes');
const filterRouter = require('./src/modules/search/filter.routes');
const cartRouter = require('./src/modules/cart/cart.routes');
const couponRouter = require('./src/modules/cart/coupon.routes'); // Old cart coupon routes if any, might be redundant now, but leaving as is for backward compatibility or removing it if it conflicts. Wait, in phase 6 there was a coupon router for cart. The user is now building a dedicated Phase 13. I will mount this one on `/api/v1/blessings`.
const checkoutRouter = require('./src/modules/checkout/checkout.routes');
const paymentRouter = require('./src/modules/payment/payment.routes');
const trackRouter = require('./src/modules/track/track.routes');
const orderRouter = require('./src/modules/orders/order.routes');
const adminRouter = require('./src/modules/admin/admin.routes');
const reviewRouter = require('./src/modules/reviews/review.routes');
const blessingRouter = require('./src/modules/coupons/coupon.routes');
const festivalRouter = require('./src/modules/festivals/festival.routes');

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/address", addressRouter);
app.use("/api/v1/wishlist", wishlistRouter);
app.use("/api/v1/collections", collectionRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/variants", variantRouter);
app.use("/api/v1/search", searchRouter);
app.use("/api/v1/filter", filterRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/coupons", couponRouter); // Kept for backwards compat if used in checkout
app.use("/api/v1/checkout", checkoutRouter);
app.use("/api/v1/payments", paymentRouter);
app.use("/api/v1/track-my-seva", trackRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/blessings", blessingRouter);
app.use("/api/v1/festivals", festivalRouter);

// Health Check API
app.get("/api/v1/health", (req, res) => {
    return res.status(200).json(
        new ApiResponse(200, "Divine Foundation is perfectly healthy and running.", { status: "Active" })
    );
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;
