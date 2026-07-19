const { body } = require("express-validator");

const createFestivalValidation = [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("description").trim().notEmpty().withMessage("Description is required"),
    body("festivalDate").isISO8601().withMessage("Invalid festival date"),
    body("bannerImage").notEmpty().withMessage("Banner image is required"),
    body("thumbnailImage").notEmpty().withMessage("Thumbnail image is required"),
    body("startDate").isISO8601().withMessage("Invalid start date"),
    body("endDate").isISO8601().withMessage("Invalid end date").custom((value, { req }) => {
        if (new Date(value) <= new Date(req.body.startDate)) {
            throw new Error("End date must be strictly after start date");
        }
        return true;
    })
];

module.exports = {
    createFestivalValidation
};
