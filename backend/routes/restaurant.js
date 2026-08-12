const express = require("express");
const restaurant = require("../models/Restaurant");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const restaurants = await restaurant.find();

    res.json(restaurants);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const restaurantData = await restaurant.findById(req.params.id);

    if (!restaurantData) {
      return res.status(404).json({
        message: "Restaurant not found"
      });
    }

    res.json(restaurantData);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

module.exports = router;