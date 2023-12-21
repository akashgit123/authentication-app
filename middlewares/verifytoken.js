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
    try {
        const secret = process.env.JWT_SECRET;
        const user = await jwt.verify(token,secret);
        req.user = user.userId;
        console.log(user);
        next();
    } catch (error) {
        return res.status(400).json({message : "Something is wrong in your token"});
    }
}

module.exports = {verifyToken}