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

// Routes Import (To be added in future phases)
// const authRouter = require('./src/modules/auth/auth.routes');
// app.use("/api/v1/auth", authRouter);

// Health Check API
app.get("/api/v1/health", (req, res) => {
    return res.status(200).json(
        new ApiResponse(200, "Divine Foundation is perfectly healthy and running.", { status: "Active" })
    );
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;
