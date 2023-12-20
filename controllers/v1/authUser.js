const UserModel = require('../../models/user');
const bcrypt = require('bcrypt');
const fs = require('fs');

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

module.exports = {registerUser , allUsers}