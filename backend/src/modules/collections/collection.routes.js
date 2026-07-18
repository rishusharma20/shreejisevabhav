const express = require("express");
const {
    createCollection,
    getAllCollections,
    getCollection,
    updateCollection,
    deleteCollection,
    enableCollection,
    disableCollection,
    getFeaturedCollections,
    getTrendingCollections,
    getFestivalCollections,
    getCollectionAnalytics
} = require("./collection.controller");
const { verifyJWT, isAdmin } = require("../../middleware/auth.middleware");
const { validate } = require("../../middleware/validate.middleware");
const { createCollectionValidation, updateCollectionValidation } = require("./collection.validation");
const { uploadCollection } = require("../../middleware/multer.middleware");

const router = express.Router();

// Public Routes
router.get("/", getAllCollections);
router.get("/type/featured", getFeaturedCollections);
router.get("/type/trending", getTrendingCollections);
router.get("/type/festival", getFestivalCollections);
router.get("/:identifier", getCollection); // slug or id

// Protected Admin Routes
router.use(verifyJWT, isAdmin);

router.post(
    "/create",
    uploadCollection.fields([
        { name: "bannerImage", maxCount: 1 },
        { name: "thumbnailImage", maxCount: 1 },
        { name: "featuredImage", maxCount: 1 }
    ]),
    createCollectionValidation,
    validate,
    createCollection
);

router.put(
    "/update/:id",
    uploadCollection.fields([
        { name: "bannerImage", maxCount: 1 },
        { name: "thumbnailImage", maxCount: 1 },
        { name: "featuredImage", maxCount: 1 }
    ]),
    updateCollectionValidation,
    validate,
    updateCollection
);

router.delete("/delete/:id", deleteCollection);
router.put("/enable/:id", enableCollection);
router.put("/disable/:id", disableCollection);
router.get("/admin/analytics", getCollectionAnalytics);

module.exports = router;
