const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.SERVER_PORT  || 5000;

const sequelize = require('./Configs/DB/DbConfig');
const RedisClient = require('./Configs/Redis/RedisConfig');

//# importing schemas ---------->
const {UserSchema} = require('./Schemas/index');

app.use(cors());
app.use(express.json());

const globalErrorHandler = require('./Utils/GlobalErrorHandler');

const signupController = require('./Controllers/Signup_Controller');

app.use(globalErrorHandler);

app.use('/api', signupController);

async function startServer(){
    try{
        await sequelize.authenticate();
        console.log("database connection done");

        await sequelize.sync();
        console.log("Schema Synced");

        await RedisClient.connect();
        console.log("Redis client connected");

        app.listen(port, ()=> console.log(`server started http://localhost:${port}`));
    }
    catch(err){
        console.log("error while starting server", err);
    }
}
startServer();