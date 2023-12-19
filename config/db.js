const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const dbURL = process.env.MONGO_DB_URL;

const connectToDb = () =>{
    mongoose.connect(dbURL)
    .then(()=>{
        console.log(`Connected to DB host : ${mongoose.connection.name}`);
    })
    .catch((err)=>{
        console.log(`Error while Connecting to db : ${err.message}`);
    })
}

module.exports = connectToDb;