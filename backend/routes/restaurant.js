const express = require("express");
const restaurant = require("../models/Restaurant");

const router = express.Router();

router.get("/", async (req,res) =>{
    try{
        const restaurants = await restaurant.find();

        res.json(restaurants);
    }

    catch(err){
        res.status(500).json({
            message: err.message
        });
    }
});

module.exports = router;
