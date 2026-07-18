const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const User = require("../models/User.model");

const verifyJWT = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        throw new ApiError(401, "Unauthorized Access: No Token Provided", { token: "Missing" });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        const user = await User.findById(decodedToken?._id).select("-password");

        if (!user) {
            throw new ApiError(401, "Unauthorized Access: Invalid Token", { token: "Invalid User" });
        }

        if (user.isBlocked) {
            throw new ApiError(403, "Access Denied: User is blocked", { account: "Blocked" });
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            throw new ApiError(401, "Unauthorized Access: Expired Token", { token: "Expired" });
        }
        throw new ApiError(401, "Unauthorized Access: Invalid Token", { token: "Invalid" });
    }
});

const isAdmin = asyncHandler(async (req, res, next) => {
    if (!req.user) {
        throw new ApiError(401, "Unauthorized Access", { user: "Not authenticated" });
    }

    if (req.user.role !== "ADMIN") {
        throw new ApiError(403, "Forbidden: Admin Access Required", { role: "Insufficient permissions" });
    }

    next();
});

module.exports = {
    verifyJWT,
    isAdmin
};
