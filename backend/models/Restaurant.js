const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    // =========================
    // BASIC INFORMATION
    // =========================
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    // =========================
    // CONTACT
    // =========================
    phone: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },

    // =========================
    // ADDRESS
    // =========================
    address: {
      street: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },

      postalCode: {
        type: String,
        required: true,
      },

      country: {
        type: String,
        default: "Germany",
      },
    },

    // =========================
    // LOCATION
    // =========================
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },

      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },

    // =========================
    // IMAGES
    // =========================
    images: [
      {
        type: String,
      },
    ],

    // =========================
    // RESTAURANT CATEGORY
    // =========================
    cuisineTypes: [
      {
        type: String,
      },
    ],

    // =========================
    // PRICE
    // =========================
    priceLevel: {
      type: Number,
      enum: [1, 2, 3],
      default: 2,
    },

    currency: {
      type: String,
      default: "EUR",
    },

    // =========================
    // RATING
    // =========================
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    reviewCount: {
      type: Number,
      default: 0,
    },

    // =========================
    // DELIVERY
    // =========================
    delivery: {
      available: {
        type: Boolean,
        default: false,
      },

      estimatedTime: {
        min: {
          type: Number,
          default: 20,
        },

        max: {
          type: Number,
          default: 40,
        },
      },

      fee: {
        type: Number,
        default: 0,
      },

      minimumOrder: {
        type: Number,
        default: 0,
      },
    },

    // =========================
    // FEATURES
    // =========================
    features: {
      fineDining: {
        type: Boolean,
        default: false,
      },

      budgetFriendly: {
        type: Boolean,
        default: false,
      },
    },

    // =========================
    // OPENING HOURS
    // =========================
    openingHours: {
      monday: {
        open: String,
        close: String,
      },

      tuesday: {
        open: String,
        close: String,
      },

      wednesday: {
        open: String,
        close: String,
      },

      thursday: {
        open: String,
        close: String,
      },

      friday: {
        open: String,
        close: String,
      },

      saturday: {
        open: String,
        close: String,
      },

      sunday: {
        open: String,
        close: String,
      },
    },

    // =========================
    // STATUS
    // =========================
    isActive: {
      type: Boolean,
      default: true,
    },
  },

  {
    timestamps: true,
  }
);

// For distance-based searches
restaurantSchema.index({
  location: "2dsphere",
});

module.exports = mongoose.model("Restaurant", restaurantSchema);