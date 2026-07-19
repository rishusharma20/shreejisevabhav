const crypto = require("crypto");
const User = require("../../models/User.model");
const Cart = require("../../models/Cart.model");
const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");
const sendEmail = require("../../utils/sendEmail");

// Configuration for secure cookies
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000 // 1 day
};

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, phone } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(400, "Registration Failed", { email: "Email already exists" });
    }

    const user = await User.create({
        name,
        email,
        password,
        phone
    });

    const createdUser = await User.findById(user._id).select("-password");
    const accessToken = user.generateAccessToken();

    return res
        .status(201)
        .cookie("accessToken", accessToken, cookieOptions)
        .json(new ApiResponse(201, "Registration Successful", { user: createdUser, accessToken }));
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        throw new ApiError(401, "Login Failed", { credentials: "Invalid email or password" });
    }

    if (user.isBlocked) {
        throw new ApiError(403, "Access Denied", { account: "User is blocked. Please contact support." });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Login Failed", { credentials: "Invalid email or password" });
    }

    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    const accessToken = user.generateAccessToken();
    const loggedInUser = await User.findById(user._id).select("-password");

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .json(new ApiResponse(200, "Login Successful", { user: loggedInUser, accessToken }));
});

// @desc    Logout user
// @route   POST /api/v1/auth/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .clearCookie("accessToken", { ...cookieOptions, maxAge: 0 })
        .json(new ApiResponse(200, "Logout Successful", {}));
});

// @desc    Get user profile
// @route   GET /api/v1/auth/profile
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
    // req.user is attached by the verifyJWT middleware
    return res.status(200).json(new ApiResponse(200, "Profile retrieved successfully", { user: req.user }));
});

// @desc    Update user profile
// @route   PUT /api/v1/auth/update-profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
    const { name, phone } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                ...(name && { name }),
                ...(phone !== undefined && { phone }) // allow nulling out phone
            }
        },
        { new: true, runValidators: true }
    ).select("-password");

    return res.status(200).json(new ApiResponse(200, "Profile updated successfully", { user: updatedUser }));
});

// @desc    Change password
// @route   PUT /api/v1/auth/change-password
// @access  Private
const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select("+password");

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
    if (!isPasswordCorrect) {
        throw new ApiError(400, "Password Change Failed", { oldPassword: "Incorrect old password" });
    }

    user.password = newPassword;
    await user.save(); // pre-save hook will hash the new password

    return res.status(200).json(new ApiResponse(200, "Password changed successfully", {}));
});

// @desc    Forgot Password (Send Reset Token)
// @route   POST /api/v1/auth/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const resetToken = user.generatePasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password/${resetToken}`;
    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. \n\n Please click on the following link, or paste this into your browser to complete the process:\n\n ${resetUrl}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`;
    
    try {
        await sendEmail({
            email: user.email,
            subject: "Shreeji Seva Bhav - Password Reset",
            message
        });

        return res.status(200).json(new ApiResponse(200, "Password reset link sent to email"));
    } catch (error) {
        user.forgotPasswordToken = undefined;
        user.forgotPasswordExpiry = undefined;
        await user.save({ validateBeforeSave: false });

        throw new ApiError(500, "Email could not be sent. Please try again later.", { error: error.message });
    }
});

// @desc    Reset Password
// @route   PUT /api/v1/auth/reset-password/:token
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!token || !newPassword) {
        throw new ApiError(400, "Token and newPassword are required");
    }

    const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
        forgotPasswordToken: resetPasswordToken,
        forgotPasswordExpiry: { $gt: Date.now() }
    });

    if (!user) {
        throw new ApiError(400, "Invalid or expired token");
    }

    // Set new password
    user.password = newPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    await user.save();

    // Optionally log them in immediately, but standard is to return success.
    return res.status(200).json(new ApiResponse(200, "Password reset successful"));
});

// @desc    Delete Account
// @route   DELETE /api/v1/auth/delete-account
// @access  Private
const deleteAccount = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    // Delete associated cart
    await Cart.findOneAndDelete({ userId });
    
    // Note: In a production system, we typically anonymize or soft-delete orders to preserve revenue integrity.
    // For V1 MVP, deleting the user is acceptable.
    await User.findByIdAndDelete(userId);

    return res
        .status(200)
        .clearCookie("accessToken", { ...cookieOptions, maxAge: 0 })
        .json(new ApiResponse(200, "Account deleted successfully"));
});

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getProfile,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    deleteAccount
};
