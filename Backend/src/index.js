const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const dbConfig = require('./DB/DbConfig');

const globalErrorHandler = require('./Utils/GlobalErrorHandler');

const port = process.env.SERVER_PORT  || 5000;

app.use(globalErrorHandler);

dbConfig.getConnection((err, connnection)=>{
    if(err){
        console.log("Error connecting to database", err);
    }
    else {
        console.log("Database connected successfully");
    }
})


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})