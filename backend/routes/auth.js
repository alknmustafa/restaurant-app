const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/register", async (req,res) =>{

    const {name, email, password} = req.body;
  

    try{
        const NewUser = new User({
            name,
            email,
            password
        });

        await NewUser.save();
        res.json({message:"User succesfully saved."});
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

        if(user.password !== password){
            return res.status(400).json({message:"Password is wrong."});
        }

        res.json({message:"You succesfully logged in."})

    }
    catch(err){
        res.status(500).json({message: err.message})
    }

});


module.exports = router;