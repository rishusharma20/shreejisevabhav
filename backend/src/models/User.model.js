const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [2, "Name must be at least 2 characters"],
            maxlength: [50, "Name cannot exceed 50 characters"]
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                "Please provide a valid email"
            ]
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters"],
            select: false // Never return password by default
        },
        phone: {
            type: String,
            trim: true,
            default: null
        },
        role: {
            type: String,
            enum: ["USER", "ADMIN"],
            default: "USER"
        },
        profileImage: {
            type: String,
            default: null
        },
        isBlocked: {
            type: Boolean,
            default: false
        },
        lastLogin: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

// Pre-save hook to hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Instance method to check password validity
userSchema.methods.isPasswordCorrect = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Instance method to generate JWT access token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            role: this.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

const User = mongoose.model("User", userSchema);

module.exports = User;
