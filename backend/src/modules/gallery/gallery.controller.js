const Gallery = require("../../models/Gallery.model");
const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");

// @desc    Get all gallery images
// @route   GET /api/v1/gallery
// @access  Public
const getGallery = asyncHandler(async (req, res) => {
    const gallery = await Gallery.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    return res.status(200).json(new ApiResponse(200, "Gallery retrieved successfully", { gallery }));
});

// @desc    Add a gallery image
// @route   POST /api/v1/gallery
// @access  Private/Admin
const addGalleryImage = asyncHandler(async (req, res) => {
    const { altText, span, order, isActive } = req.body;

    if (!req.file) {
        throw new ApiError(400, "Image is required");
    }

    const url = `/uploads/gallery/${req.file.filename}`;

    const galleryImage = await Gallery.create({
        url,
        altText,
        span: span || "normal",
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true
    });

    return res.status(201).json(new ApiResponse(201, "Gallery image added", { galleryImage }));
});

// @desc    Update a gallery image
// @route   PUT /api/v1/gallery/:id
// @access  Private/Admin
const updateGalleryImage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { altText, span, order, isActive } = req.body;

    const galleryItem = await Gallery.findById(id);
    if (!galleryItem) {
        throw new ApiError(404, "Gallery item not found");
    }

    let updateData = { altText, span, order, isActive };
    if (req.file) {
        updateData.url = `/uploads/gallery/${req.file.filename}`;
    }

    const updatedGalleryImage = await Gallery.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
    );

    return res.status(200).json(new ApiResponse(200, "Gallery image updated", { galleryImage: updatedGalleryImage }));
});

// @desc    Delete a gallery image
// @route   DELETE /api/v1/gallery/:id
// @access  Private/Admin
const deleteGalleryImage = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const galleryItem = await Gallery.findByIdAndDelete(id);
    if (!galleryItem) {
        throw new ApiError(404, "Gallery item not found");
    }

    // Ideally, also delete the physical file using fs.unlinkSync but keeping it simple for now
    return res.status(200).json(new ApiResponse(200, "Gallery image deleted successfully", {}));
});

module.exports = {
    getGallery,
    addGalleryImage,
    updateGalleryImage,
    deleteGalleryImage
};
