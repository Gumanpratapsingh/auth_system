
const express = require('express');
const bcrypt = require('bcryptjs');
require("dotenv").config();
require('./config/database').connect();
const User = require('./model/user');
const app = express();
app.use(express.json());
const jwt = require("jsonwebtoken");

const auth = require('./middleware/auth');



app.get("/", (req, res) => {
    res.send("<h1>Hello from auth system - Gps </h1>");

})
app.post("/register", async(req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
    if(!firstname || !lastname || !email || !password) {
        res.status(400).send("Please provide all the details");
    }

    const existingUser = await User.findOne({email}); // it returns the promise and it can recive back


    if(existingUser){
        res.status(401).send("User already exists");
    }

    const  myEncPassword = await bcrypt.hash(password,10);
    
    const user = await User.create({
        firstname,
        lastname,
        email: email.toLowerCase(),
        password: myEncPassword
    });
    //token-creation

    const token = jwt.sign(
        {user_id: user._id, email},
        process.env.SECRET_KEY,
        {
            expiresIn: "2h"
        }
    )
        user.token = token
        user.password = undefined
        //update or not
        //send token or send just success yes - choice
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
    }


})

app.post("/login", async(req,res)=>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            res.status(400).send("Please provide all the details");
        }

        const user = await User.findOne({email});

       

        if(user && (await bcrypt.compare(password, user.password
            ))){
            const token = jwt.sign(
                {user_id: user._id, email},
                process.env.SECRET_KEY,
                {
                    expiresIn: "2h"
                }
            )
            user.token = token
            user.password = undefined
            res.status(200).json(user);
        }
        //if you want to use the cookies
       
            ``
        res.status(400).send("Invalid Credentials");
        
    } catch(error){
        console.log(error);
    }
} )

app.get("/dashboard", auth, (req,res)=>{
    res.send("<h1>Welcome to dashboard</h1>");
});

module.exports = app;

