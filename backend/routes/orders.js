const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const verifyToken = require("../middleware/verifyToken");


// CREATE ORDER
router.post("/", verifyToken, async (req, res) => {

    try {

        const {
            restaurantId,
            customer,
            items,
            subtotal,
            deliveryFee,
            totalPrice,
            paymentMethod
        } = req.body;


        const order = new Order({

            userId: req.user.id,

            restaurantId,

            customer,

            items,

            subtotal,

            deliveryFee,

            totalPrice,

            paymentMethod
        });


        const savedOrder = await order.save();


        res.status(201).json(savedOrder);


    } catch (error) {

        console.error("Create order error:", error);

        res.status(500).json({
            message: "Failed to create order"
        });

    }

});


// GET ALL USER ORDERS
router.get("/", verifyToken, async (req, res) => {

    try {

        const orders = await Order.find({
            userId: req.user.id
        })
            .populate("restaurantId")
            .populate("items.foodId")
            .sort({ createdAt: -1 });


        res.status(200).json(orders);


    } catch (error) {

        console.error("Get orders error:", error);

        res.status(500).json({
            message: "Failed to fetch orders"
        });

    }

});


// GET SINGLE ORDER
router.get("/:id", verifyToken, async (req, res) => {

    try {

        const order = await Order.findOne({
            _id: req.params.id,
            userId: req.user.id
        })
            .populate("restaurantId")
            .populate("items.foodId");


        if (!order) {

            return res.status(404).json({
                message: "Order not found"
            });

        }


        res.status(200).json(order);


    } catch (error) {

        console.error("Get order error:", error);

        res.status(500).json({
            message: "Failed to fetch order"
        });

    }

});


module.exports = router;

