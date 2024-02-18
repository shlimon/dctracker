require("dotenv").config(); 
const express = require("express"); 
const mongoose = require("mongoose");
const cors = require("cors")
const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken");
const connectDB = require("./config/DBConfig");
const careViewBudget = require("./utils/CareviewApi");
const User = require("./model/User"); 



connectDB();

const app = express(); 
const PORT = process.env.PORT || 4000; 


app.use(cors()); 

app.use(express.urlencoded({extended:false})); 
app.use(express.json()); 


const NDIS =  430938246; 


app.get('/', async (req, res) => {

    
        const data = await careViewBudget(NDIS);
        console.log(data); // log response data
        res.json(data);
    
})

app.use('/members', require('./routes/member'));

app.use('/register', require('./routes/register'));

app.use('/login', require('./routes/login'));

// app.post("/login", async (req, res) => {

//   try {
    
//     const {email, password} = req.body
//     const user = await User.findOne({email});
//     if(!user) return res.status(401).json({error: 'No User Access'});
    
//     const isPasswordValid = await bcrypt.compare(password, user.password); 
//     if(!isPasswordValid) return res.status(401).json({error: 'Invalid Password'})
    
//     const token = jwt.sign({userId : user._id}, SECRET_KEY, {expiresIn : '1hr'})

//     res.json({message: "Login Successful"})

//   } catch (error) {
//     res.status(500).json({error: error.message })
//   }

// })

mongoose.connection.once('open', () => {
  console.log('Connected to DB');
  app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
  })
}) 