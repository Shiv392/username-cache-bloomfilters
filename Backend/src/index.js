const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.SERVER_PORT  || 5000;

const logger = require('./Utils/Logger.js');

const {sequelize, RedisClient} = require('./Configs/index.js')

//# importing schemas ---------->
const {UserSchema} = require('./Schemas/index');

app.use(cors());
app.use(express.json());

const globalErrorHandler = require('./Utils/GlobalErrorHandler');

const signupController = require('./Controllers/Signup_Controller');
const {SignupController, UserNameController} = require('./Controllers/index.js');

app.use('/api', SignupController);
app.use('/api', UserNameController);

app.use(globalErrorHandler);

async function startServer(){
    try{
        await sequelize.authenticate();
        console.log("database connection done");

        await sequelize.sync({force : true});
        console.log("Schema Synced");

        await RedisClient.connect();
        console.log("Redis client connected");

        app.listen(port, ()=> logger.info(`Server started : http://localhost:${port}`));
    }
    catch(err){
        logger.error(err);
    }
}
startServer();