const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
app.use(cors());
app.use(express.json());

const port = process.env.SERVER_PORT  || 5000;

const sequelize = require('./DB/DbConfig');
//# importing schemas ---------->
const {UserSchema} = require('./Schemas/index');

const globalErrorHandler = require('./Utils/GlobalErrorHandler');

const signupController = require('./Controllers/Signup_Controller');

app.use(globalErrorHandler);

async function startServer(){
    try{
        await sequelize.authenticate();
        console.log("database connection done");

        await sequelize.sync();
        console.log("Schema Synced");

        app.listen(port, ()=> console.log(`server started http://localhost:${port}`));
    }
    catch(err){
        console.log("error while starting server", err);
    }
}
startServer();