const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    default: ""
  },

  address: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    default: ""
  },

  image: {
    type: String,
    default: ""
  },

  priceRange: {
    type: String,
    default: "€10 - €25"
  },

  rating: {
    type: Number,
    default: 0
  },

  reviewCount: {
    type: Number,
    default: 0
  },

  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Restaurant", restaurantSchema);