const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/User.model");

require("dotenv").config()
const userRouter=express.Router()


userRouter.post("/register", async(req,res) => {
    const {name,email,gender,password,age,city} = req.body;
    try{
        bcrypt.hash(password,5, async(err,hash) => {
            if(err){
                res.send({"msg": "User is not Registered", "error": err.message});
            }else{
                const user = await UserModel.find({email:email});
                if(user.length>0){
                    res.send({"msg": "User is Already Presend"})
                }else{
                    const user = new UserModel({name,email,gender,password:hash,age,city});
                    await user.save();
                    res.send({"msg": "User is Successfully Registered"})
                }
                
            }
        })
    }catch(err){
        res.send({"msg": "User is not Registered", "error": err.message});
    }
})

userRouter.post("/login", async(req,res) => {
    const {email,password} = req.body;

    try{
        const user = await UserModel.find({email})
        if(user.length>0){
            const hashedPassword = user[0].password;
            bcrypt.compare(password,hashedPassword,(err,result) => {
                if(result){
                    const token = jwt.sign({"userID":user[0]._id}, "linkedin");
                    res.send({"msg": "Login Successful", "token": token})
                }else{
                    res.send("Wrong Credentials")
                }
            })
        }
    }catch(err){
        res.send({"msg": "User is not Login", "error": err.message});
    }
})



module.exports = {
    userRouter
}