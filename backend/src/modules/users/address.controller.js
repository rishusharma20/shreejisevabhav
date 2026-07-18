const Address = require("../../models/Address.model");
const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");

// @desc    Add new address
// @route   POST /api/v1/address/add
// @access  Private
const addAddress = asyncHandler(async (req, res) => {
    const { name, phone, houseNo, street, city, state, country, pincode, isDefault } = req.body;

    const addressCount = await Address.countDocuments({ userId: req.user._id });

    // If it's the first address, make it default automatically
    const defaultStatus = addressCount === 0 ? true : isDefault || false;

    const address = await Address.create({
        userId: req.user._id,
        name,
        phone,
        houseNo,
        street,
        city,
        state,
        country,
        pincode,
        isDefault: defaultStatus
    });

    return res.status(201).json(new ApiResponse(201, "Address added successfully", { address }));
});

// @desc    Get user addresses
// @route   GET /api/v1/address
// @access  Private
const getAddresses = asyncHandler(async (req, res) => {
    const addresses = await Address.find({ userId: req.user._id }).sort({ isDefault: -1, createdAt: -1 });
    
    return res.status(200).json(new ApiResponse(200, "Addresses retrieved successfully", { addresses }));
});

// @desc    Update address
// @route   PUT /api/v1/address/update/:id
// @access  Private
const updateAddress = asyncHandler(async (req, res) => {
    const addressId = req.params.id;

    // Verify ownership
    const address = await Address.findOne({ _id: addressId, userId: req.user._id });
    if (!address) {
        throw new ApiError(404, "Address not found or unauthorized");
    }

    const updatedAddress = await Address.findByIdAndUpdate(
        addressId,
        { $set: req.body },
        { new: true, runValidators: true }
    );

    // If the updated address is set to default, the pre-save hook on the model won't run for findByIdAndUpdate.
    // So we need to handle it manually if isDefault became true.
    if (req.body.isDefault === true) {
        await Address.updateMany(
            { userId: req.user._id, _id: { $ne: addressId } },
            { $set: { isDefault: false } }
        );
    }

    return res.status(200).json(new ApiResponse(200, "Address updated successfully", { address: updatedAddress }));
});

// @desc    Delete address
// @route   DELETE /api/v1/address/delete/:id
// @access  Private
const deleteAddress = asyncHandler(async (req, res) => {
    const addressId = req.params.id;

    const address = await Address.findOne({ _id: addressId, userId: req.user._id });
    if (!address) {
        throw new ApiError(404, "Address not found or unauthorized");
    }

    await Address.findByIdAndDelete(addressId);

    // If the deleted address was default, make the most recently created remaining address the default
    if (address.isDefault) {
        const latestAddress = await Address.findOne({ userId: req.user._id }).sort({ createdAt: -1 });
        if (latestAddress) {
            latestAddress.isDefault = true;
            await latestAddress.save();
        }
    }

    return res.status(200).json(new ApiResponse(200, "Address deleted successfully", {}));
});

// @desc    Set default address
// @route   PUT /api/v1/address/set-default/:id
// @access  Private
const setDefaultAddress = asyncHandler(async (req, res) => {
    const addressId = req.params.id;

    const address = await Address.findOne({ _id: addressId, userId: req.user._id });
    if (!address) {
        throw new ApiError(404, "Address not found or unauthorized");
    }

    address.isDefault = true;
    await address.save(); // This triggers the pre-save hook to unset others

    return res.status(200).json(new ApiResponse(200, "Default address updated", { address }));
});

module.exports = {
    addAddress,
    getAddresses,
    updateAddress,
    deleteAddress,
    setDefaultAddress
};
