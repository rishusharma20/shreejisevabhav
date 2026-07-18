const User = require("../../models/User.model");
const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");

// @desc    Upload profile image
// @route   PUT /api/v1/users/upload-profile-image
// @access  Private
const uploadProfileImage = asyncHandler(async (req, res) => {
    if (!req.file) {
        throw new ApiError(400, "Upload Failed", { file: "Please upload an image" });
    }

    const imagePath = `/uploads/profiles/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
        req.user._id,
        { $set: { profileImage: imagePath } },
        { new: true }
    ).select("-password");

    return res.status(200).json(new ApiResponse(200, "Profile image uploaded successfully", { user }));
});

// @desc    Delete account
// @route   DELETE /api/v1/users/delete-account
// @access  Private
const deleteAccount = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        throw new ApiError(404, "Account not found");
    }

    await User.findByIdAndDelete(req.user._id);
    // Note: We'd also delete associated addresses/wishlists/orders in a real cascade, 
    // but for now we focus on the user record.

    return res
        .status(200)
        .clearCookie("accessToken")
        .json(new ApiResponse(200, "Account deleted successfully", {}));
});

// @desc    Get account settings (status, roles, etc)
// @route   GET /api/v1/users/account-settings
// @access  Private
const getAccountSettings = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("isBlocked role createdAt lastLogin");
    
    return res.status(200).json(new ApiResponse(200, "Account settings retrieved", { settings: user }));
});

// --- ADMIN ROUTES ---

// @desc    Get all users
// @route   GET /api/v1/users/admin/all
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    return res.status(200).json(new ApiResponse(200, "Users retrieved successfully", { users }));
});

// @desc    Block user
// @route   PUT /api/v1/users/admin/block/:id
// @access  Private/Admin
const blockUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) throw new ApiError(404, "User not found");

    if (user.role === "ADMIN") {
        throw new ApiError(403, "Cannot block an administrator");
    }

    user.isBlocked = true;
    await user.save({ validateBeforeSave: false });

    return res.status(200).json(new ApiResponse(200, "User blocked successfully", {}));
});

// @desc    Unblock user
// @route   PUT /api/v1/users/admin/unblock/:id
// @access  Private/Admin
const unblockUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) throw new ApiError(404, "User not found");

    user.isBlocked = false;
    await user.save({ validateBeforeSave: false });

    return res.status(200).json(new ApiResponse(200, "User unblocked successfully", {}));
});

// @desc    Delete user (Admin)
// @route   DELETE /api/v1/users/admin/delete/:id
// @access  Private/Admin
const deleteUserAdmin = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) throw new ApiError(404, "User not found");

    if (user.role === "ADMIN") {
        throw new ApiError(403, "Cannot delete an administrator");
    }

    await User.findByIdAndDelete(req.params.id);
    
    return res.status(200).json(new ApiResponse(200, "User deleted successfully", {}));
});

module.exports = {
    uploadProfileImage,
    deleteAccount,
    getAccountSettings,
    getAllUsers,
    blockUser,
    unblockUser,
    deleteUserAdmin
};
