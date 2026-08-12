const express = require("express");
const Meal = require("../models/Meal");

const router = express.Router();

router.get("/:restaurantId", async (req, res) => {
  try {
    const meals = await Meal.find({
      restaurantId: req.params.restaurantId
    });

    res.json(meals);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

module.exports = router;