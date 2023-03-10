const jwt = require("jsonwebtoken");

const authenticate = (req,res,next) => {
    const token = req.headers.authorization

    if(token){
        const decoded = jwt.verify(token,"linkedin")
        if(decoded){
            const userID = decoded.userID;
            req.body.userID = userID;
            next()
        }else{
            req.send({"msg": "Please Login First"})
        }
    }else{
        res.send({"msg": "Please Login First"})
    }
}

module.exports = {
    authenticate
}