const UserModel = require('../../models/user');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path')
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const registerUser =async (req,res) =>{
    try {
        const {name,email,password} = req.body;
        // console.log(req.file);
        const userExists = await UserModel.findOne({email});
        if(userExists){
            if(fs.existsSync(req.file.path)){
                fs.unlinkSync(req.file.path);
            }
           return res.status(200).json({message : "user already exists"})
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = await UserModel.create({
            name , email , password : hash , image : req.file.filename
        })
        if(newUser){
            return res.status(200).json({message : "user created", newUser})
        }

    } catch (error) {
        console.log("Error : ", error);
        return res.status(400).json({errorMessage : error})
    }
}

const allUsers = async(req,res) =>{
    try {
        const users = await UserModel.find();
        if(users){
            return res.status(200).json({users});
        }

    } catch (error) {
        return res.status(400).json({errorMessage : error})
    }
}

const loginUser = async(req,res) =>{
    try {
        const {email,password} = req.body;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(400).json({message : "Email not found"});
        }
        if(!bcrypt.compareSync(password, user.password)){
            return res.status(400).json({message : "Password not Matched"});
        }
        const secret = process.env.JWT_SECRET;
        const authToken = await jwt.sign(
            {
                userId : user._id
            },
            secret,
            {
                expiresIn :'1h'
            });
        return res.status(200).json({message : `Login successful ${user.name}`,authToken});

    } catch (error) {
        return res.status(400).json({errorMessage : error})
    }
}

const userProfile = async(req,res) =>{
    try {
        const userId = req.user;
        const user = await UserModel.findById(userId).select("-password");
        if(!user){
            return res.status(400).json({message : "User does not exist"});
        }
        return res.status(200).json({user});
    } catch (error) {
        return res.status(400).json({errorMessage : error})
    }
}

const updateProfile = async(req,res)=>{
    try {
        const userId = req.user;
        const userExists = await UserModel.findById(userId).select("-password");
        if(!userExists){
            return res.status(400).json({message : "User does not exist"});
        }

        const updateObj = {};
        if(req.file){
            const filePath = path.join(path.resolve(),"/uploads/"+userExists.image)
            console.log(filePath);
            if(fs.existsSync(filePath)){
                fs.unlinkSync(filePath);
            }
            updateObj['image'] = req.file.filename
        }
        if(req.body.name) { updateObj['name'] = req.body.name }
        if(req.body.email) { updateObj['email'] = req.body.email }

        const updatedUser = await UserModel.findByIdAndUpdate(userId,{
            $set :{...updateObj}
        })
        if(!updatedUser){
            return res.status(400).json({Message : "Failed to update"})
        }
        return res.status(200).json({Message : "Updated your profile"})
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({errorMessage : error})
    }
}

module.exports = {registerUser , allUsers , loginUser , userProfile , updateProfile}