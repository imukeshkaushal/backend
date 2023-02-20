const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./Routes/User.routes");
const { authenticate } = require("./Middlewares/authenticate.middleware");
const { postRouter } = require("./Routes/Post.routes");

const app = express();

const cors = require("cors");
require("dotenv").config();

app.use(cors({
    origin : "*"
}))

app.use(express.json());

app.get("/",(req,res) => {
    res.send({"msg": "Home Page"});
})

app.use("/users", userRouter)
app.use(authenticate)
app.use("/posts",postRouter)

app.listen(process.env.Port, async() => {
    try{
        await connection
        console.log("Connected to DB");

    }catch(err){
        console.log("Connecting Problem Faced");
    }
    console.log("Port is Running")
})