const express = require('express');
const connectToDb = require('./config/db');
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.PORT;
const cors = require('cors');
const morgan = require('morgan');
const ApiError = require('./utils/apiError');
const httpStatus = require('http-status');
const errorHandler = require('./middlewares/errorHandler');

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
    // res.send("Worked");
    throw new ApiError(httpStatus.NOT_FOUND,"Page not found")
})

app.use(errorHandler)

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})