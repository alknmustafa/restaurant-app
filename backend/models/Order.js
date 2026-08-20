const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        restaurantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restaurant",
            required: true
        },

        customer: {
            name: {
                type: String,
                required: true,
                trim: true
            },

            email: {
                type: String,
                required: true,
                trim: true,
                lowercase: true
            },

            address: {
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
                }
            },

            notes: {
                type: String,
                default: "",
                trim: true
            }
        },

        items: [
            {
                foodId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Meal",
                    required: true
                },

                name: {
                    type: String,
                    required: true
                },

                price: {
                    type: Number,
                    required: true,
                    min: 0
                },

                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                    default: 1
                }
            }
        ],

        subtotal: {
            type: Number,
            required: true,
            min: 0
        },

        deliveryFee: {
            type: Number,
            required: true,
            min: 0
        },

        totalPrice: {
            type: Number,
            required: true,
            min: 0
        },

        paymentMethod: {
            type: String,
            enum: ["cash", "card"],
            default: "cash"
        },

        status: {
            type: String,
            enum: [
                "pending",
                "preparing",
                "on_the_way",
                "delivered",
                "cancelled"
            ],
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Order", orderSchema);