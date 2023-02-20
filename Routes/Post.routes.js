const express = require("express");
const { PostModel } = require("../models/Post.model");
const postRouter = express.Router();

postRouter.get("/", async(req,res) => {
    try{
        const posts = await PostModel.find();
        res.send(posts);
    }catch(err){
        res.send({"msg": "Cannot Get the Posts", "error": err.message})
    }
})

postRouter.get("/top", async(req,res) => {
    try{
        const posts = await PostModel.findOne({}).sort({no_if_comments: -1});
        res.send(posts);
    }catch(err){
        res.send({"msg": "Cannot Get the Posts", "error": err.message})
    }
})


postRouter.post("/create", async(req,res) => {
    const payload = req.body;
    try{
        const newPost = new PostModel(payload)
        await newPost.save();
        res.send({"msg": "Post is Created Successfully"});
    }catch(err){
        res.send({"msg": "Cannot Create the Post", "error": err.message})
    }
})



postRouter.patch("/update/:id", async(req,res) => {
    const ID = req.params.id
    const payload = req.body
    const post = await PostModel.findOne({"_id":ID})
    const userId_in_post = post.userID;
    const userId_making_request = req.body.userID;
    try{
        if(userId_in_post !== userId_making_request){
            res.send("You are not authorized")
        }else{
            await PostModel.findByIdAndUpdate({_id:ID}, payload)
            res.send({"msg": "Post is Updated Successfully"})
        }
    }catch(err){
        res.send({"msg": "Something Went Wrong", "error": err.message})
    }
})

postRouter.delete("/delete/:id", async(req,res) => {
    const ID = req.params.id
    const payload = req.body
    const post = await PostModel.findOne({"_id":ID})
    const userId_in_post = post.userID;
    const userId_making_request = req.body.userID;
    try{
        if(userId_in_post !== userId_making_request){
            res.send("You are not authorized")
        }else{
            await PostModel.findByIdAndDelete({_id:ID}, payload)
            res.send({"msg": "Post is Deleted Successfully"})
        }
    }catch(err){
        res.send({"msg": "Something Went Wrong", "error": err.message})
    }
})

module.exports = {
    postRouter
}