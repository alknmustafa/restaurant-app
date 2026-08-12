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

  address: {
    type: String,
    default: ""
  },

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