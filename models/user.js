const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required :[true , "Name is required"]
    },
    email:{
        type:String,
        required :[true , "Email is required"]
    },
    password:{
        type:String,
        required :[true , "Password is required"]
    },
    image:{
        type:String,
        required :[true , "Image is required"]
    },
},
{
    timestamps : true
})

//middleware
UserSchema.pre("create",async function(next){
    const user = this;
    if(user.isModified("password")){
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);
    }
    next();
})


module.exports = mongoose.model('user',UserSchema);