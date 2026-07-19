const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const { errorHandler } = require("./src/middleware/error.middleware");
const ApiResponse = require("./src/utils/ApiResponse");

const app = express();

// Security Middlewares
app.use(helmet());
app.use(compression());
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
const collectionRouter = require('./src/modules/collections/collection.routes');
const productRouter = require('./src/modules/products/product.routes');
const variantRouter = require('./src/modules/products/variant.routes');
const cartRouter = require('./src/modules/cart/cart.routes');
const paymentRouter = require('./src/modules/payment/payment.routes');
const trackRouter = require('./src/modules/track/track.routes');
const orderRouter = require('./src/modules/orders/order.routes');
const checkoutRouter = require('./src/modules/checkout/checkout.routes');
const adminRouter = require('./src/modules/admin/admin.routes');
const reviewRouter = require('./src/modules/reviews/review.routes');

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/address", addressRouter);
app.use("/api/v1/collections", collectionRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/variants", variantRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/payments", paymentRouter);
app.use("/api/v1/track-my-seva", trackRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/checkout", checkoutRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/reviews", reviewRouter);

// Health Check API
app.get("/api/v1/health", (req, res) => {
    return res.status(200).json(
        new ApiResponse(200, "Divine Foundation is perfectly healthy and running.", { status: "Active" })
    );
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;
