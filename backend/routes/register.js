require("dotenv").config();
const express = require("express"); 
const router = express.Router();
const bcrypt = require("bcrypt"); 
const User = require("../model/User"); 

router.route('/')
    .get(async (req, res) => {
      
        try {
    
            const users = await User.find()
            res.status(200).json(users); 
        
          } catch (error) {
            
            res.status(500).json({error : "unable to get users"}); 
        
          }


    })
    .post(async (req, res) => {
        
        try {
            const {email, password} = req.body; 
            const hashedPassword = await bcrypt.hash(password, 10); 
            console.log('Password Hashed');
            const newUser = new User({
              email, password: hashedPassword
            })
        
            const result = await newUser.save(); 
        
            res.status(200).json(result); 
        
          } catch (error) {
            res.status(500).json({error :"Error in registering the user"})
          }
    })

    module.exports = router;  