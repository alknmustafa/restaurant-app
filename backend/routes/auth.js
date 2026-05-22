const bcrypt = require('bcrypt');
const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/register", async (req,res) =>{

    const {name, email,password} = req.body;

    try{

        if (!email || !password) {
        return res.status(400).json({ message: "Missing credentials" });
        }

        if(!password || password.length <6){
            return res.status(400).json({message: "Password is too short."});
        }

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({message: "Email already exists."});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const NewUser = new User({
            name,
            email,
            password : hashedPassword
        });

        await NewUser.save();
        res.json({message:"User successfully saved."});
    }
    catch(err){
        res.status(500).json({message:err.message});
        }
    }
);

router.post("/login", async (req,res)=>{

    const {email,password} = req.body;

    try{

        const user = await User.findOne({email})

        if (!user){
            return res.status(400).json({message :"User not found"});
        }

        const isMatch = await bcrypt.compare(password,user.password);
    
        if(!isMatch){
            return res.status(400).json({ message : "Wrong password"});
        }

        res.json({message:"You successfully logged in."})
    }

    catch(err){
        res.status(500).json({message: err.message})
    }

});


module.exports = router;