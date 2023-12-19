const express = require('express');
const connectToDb = require('./config/db');
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.PORT;
const cors = require('cors');
const morgan = require('morgan');

//middlewares
app.use(cors())
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//db connection
connectToDb();

//apis
app.use('/api/v1',require('./routes/v1/authUser'));

app.get('/',(req,res)=>{
    res.send("Worked");
})

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})