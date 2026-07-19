const User = require("../../models/User.model");
const NotificationSettings = require("../../models/NotificationSettings.model");
const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");

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

    // Default settings are all 'true'
    await NotificationSettings.create({ userId: user._id });

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

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getProfile,
    updateProfile,
    changePassword
};
