const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const verifyToken = async(req,res,next) =>{
    const authToken = req.headers['authorization'];

    if(!authToken || !authToken.startsWith("Bearer ")){
        return res.status(400).json({message : "Not authorized ... Please Login"});
    }

    const token = authToken.split(" ")[1];
    if(!token){
        return res.status(400).json({message : "Proivde valid token"});
    }

    const secret = process.env.JWT_SECRET;
    const {userId} = await jwt.verify(token,secret);
    console.log(userId);
    if(!userId){
        return res.status(400).json({message : "Something went wrong middleware"});
    }
    req.user = userId;
    next()
}

module.exports = {verifyToken}