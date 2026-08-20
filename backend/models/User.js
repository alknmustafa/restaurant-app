const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },

    country: {
        type: String,
        default: "Germany"
    },

    phone: {
        type: String,
        default: ""
    },

    addresses: [
        {
            label: {
                type: String,
                default: "Home",
                trim: true
            },

            street: {
                type: String,
                required: true,
                trim: true
            },

            houseNumber: {
                type: String,
                required: true,
                trim: true
            },

            postalCode: {
                type: String,
                required: true,
                trim: true
            },

            city: {
                type: String,
                required: true,
                trim: true
            },

            additionalInfo: {
                type: String,
                default: "",
                trim: true
            },

            isDefault: {
                type: Boolean,
                default: false
            }
        }
    ],

    favorites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restaurant"
        }
    ],

    paymentMethods: [
        {
            type: {
                type: String,
                default: "card"
            },
            last: String,
            brand: String
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);