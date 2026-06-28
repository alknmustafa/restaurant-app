const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const express = require("express");
const User = require("../models/User");
const verifyToken = require("../middleware/verifyToken");

const router = require("express").Router();

router.post("/register", async (req, res) => {

    const { name, email, password } = req.body;

    try {

        if (!email || !password) {
            return res.status(400).json({ message: "Missing credentials" });
        }

        if (!password || password.length < 6) {
            return res.status(400).json({ message: "Password is too short." });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const NewUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await NewUser.save();
        res.json({ message: "User successfully saved." });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}
);

router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Wrong password" });
        }

        const token = jwt.sign({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        },
            process.env.JWT_SECRET, {
            expiresIn: "1d"
        });


        res.json({
            message: "Login successful",
            token,
            user: {
                name: user.name,
            }

        })
    }

    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get("/test", verifyToken, (req, res) => {
    res.json({
        message: "Middleware works",
        user: req.user,
    });
});

router.get("/user", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select(
            "name email country phone address favorites paymentMethods"

        );

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});


router.put("/user", verifyToken, async (req, res) => {
    try {
        const updateData = {};

        if (req.body.name !== undefined) updateData.name = req.body.name;
        if (req.body.country !== undefined) updateData.country = req.body.country;
        if (req.body.phone !== undefined) updateData.phone = req.body.phone;
        if (req.body.address !== undefined) updateData.address = req.body.address;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: updateData },
            { returnDocument: "after" }
        ).select("name email country phone address");

        res.json(user);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



router.delete("/user", verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;

        const deletedUser = await User.findByIdAndUpdate(userId, { isDeleted: true });

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "Your account deleted successfully." });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }

});




module.exports = router;    