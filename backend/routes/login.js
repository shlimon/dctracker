require("dotenv").config();
const express = require("express"); 
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User"); 

router.route('/')
    
    .post(async (req, res) => {
        
        try {
    
            const {email, password} = req.body
            const user = await User.findOne({email});
            if(!user) return res.status(401).json({error: 'No User Access'});
            
            const isPasswordValid = await bcrypt.compare(password, user.password); 
            if(!isPasswordValid) return res.status(401).json({error: 'Invalid Password'})
            
            const token = jwt.sign({userId : user._id}, process.env.SECRET_KEY, {expiresIn : '1hr'})
        
            res.json({message: "Login Successful"})
        
          } catch (error) {
            res.status(500).json({error: error.message})
          }
    })

    module.exports = router;  