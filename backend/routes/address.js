const router = require("express").Router();
const User = require("../models/User");
const verifyToken = require("../middleware/verifyToken");


// GET ALL ADDRESSES

router.get("/", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("addresses");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user.addresses);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});


// ADD ADDRESS

router.post("/", verifyToken, async (req, res) => {
    try {
        const {
            label,
            street,
            houseNumber,
            postalCode,
            city,
            additionalInfo,
            isDefault
        } = req.body;

        if (!street || !houseNumber || !postalCode || !city) {
            return res.status(400).json({
                message: "Street, house number, postal code and city are required."
            });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // First address is always default
        const isFirstAddress = user.addresses.length === 0;

        // Address should be default if:
        // - it is the first address
        // - user selected "Set as default"
        const shouldBeDefault = isFirstAddress || isDefault === true;

        // If this address will be default,
        // remove default from all existing addresses
        if (shouldBeDefault) {
            user.addresses.forEach((address) => {
                address.isDefault = false;
            });
        }

        const newAddress = {
            label: label || "Home",
            street,
            houseNumber,
            postalCode,
            city,
            additionalInfo: additionalInfo || "",
            isDefault: shouldBeDefault
        };

        user.addresses.push(newAddress);

        await user.save();

        res.status(201).json(
            user.addresses[user.addresses.length - 1]
        );

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});


// UPDATE ADDRESS

router.put("/:addressId", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const address = user.addresses.id(req.params.addressId);

        if (!address) {
            return res.status(404).json({
                message: "Address not found"
            });
        }

        // Fields that can be updated
        const allowedFields = [
            "label",
            "street",
            "houseNumber",
            "postalCode",
            "city",
            "additionalInfo"
        ];

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                address[field] = req.body[field];
            }
        });

        // DEFAULT ADDRESS

        if (req.body.isDefault === true) {

            // Make every other address non-default
            user.addresses.forEach((item) => {
                item.isDefault = item._id.equals(address._id)
                    ? true
                    : false;
            });

        }

        await user.save();

        res.json(address);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});


// DELETE ADDRESS

router.delete("/:addressId", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const address = user.addresses.id(req.params.addressId);

        if (!address) {
            return res.status(404).json({
                message: "Address not found"
            });
        }

        const wasDefault = address.isDefault;

        // Remove address
        address.deleteOne();

        // If deleted address was default,
        // make another address default
        if (wasDefault) {
            const remainingAddresses = user.addresses.filter(
                (item) => !item._id.equals(req.params.addressId)
            );

            if (remainingAddresses.length > 0) {
                remainingAddresses[0].isDefault = true;
            }
        }

        await user.save();

        res.json({
            message: "Address deleted successfully."
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});


module.exports = router;