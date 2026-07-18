const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        name: {
            type: String,
            required: [true, "Name is required for the address"],
            trim: true
        },
        phone: {
            type: String,
            required: [true, "Phone number is required for the address"],
            trim: true
        },
        houseNo: {
            type: String,
            required: [true, "House/Flat No. is required"],
            trim: true
        },
        street: {
            type: String,
            required: [true, "Street/Locality is required"],
            trim: true
        },
        city: {
            type: String,
            required: [true, "City is required"],
            trim: true
        },
        state: {
            type: String,
            required: [true, "State is required"],
            trim: true
        },
        country: {
            type: String,
            default: "India",
            trim: true
        },
        pincode: {
            type: String,
            required: [true, "Pincode is required"],
            trim: true
        },
        isDefault: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

// Pre-save hook: If this address is set to default, make all other addresses of this user non-default
addressSchema.pre("save", async function (next) {
    if (this.isDefault) {
        await mongoose.model("Address").updateMany(
            { userId: this.userId, _id: { $ne: this._id } },
            { $set: { isDefault: false } }
        );
    }
    next();
});

const Address = mongoose.model("Address", addressSchema);
module.exports = Address;
