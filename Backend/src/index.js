const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
app.use(cors());
app.use(express.json());

const port = process.env.SERVER_PORT  || 5000;
const dbConfig = require('./DB/DbConfig');
const globalErrorHandler = require('./Utils/GlobalErrorHandler');
const signupController = require('./Controllers/Signup_Controller');

app.use(globalErrorHandler);

dbConfig.getConnection((err, connnection)=>{
    if(err){
        console.log("Error connecting to database", err);
    }
    else {
        console.log("Database connected successfully");
    }
});

app.use('/api/v1', signupController);


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})