const { findUserByEmail, findUserName, UserSignUp } = require('../Repository/index');
const { RedisClient } = require('../Configs/index');
const AppError = require('../Utils/AppError');
const ValidateEmail = require("../Utils/ValidateEmail");
const ValidatePassword = require("../Utils/ValidatePassword");
const HashPassword = require('../Utils/HashPassword');

const SignupService = async (req, res) => {
        const { email, username, password} = req.body;
        if (!email || !username || !password) {
            throw new AppError("Email ,Username & Password are required", 400);
        }

        //check email and password validation
        if(!ValidateEmail({email : email})){
            throw new AppError("Email is not valid", 400);
        }

        if(!ValidatePassword({password : password})){
            throw new AppError("Password is invalid", 400);
        }

        //first check if the username is not available
        //it will check BF.EXISTS in usernames dataset in the bloom filter.
        const exists = await RedisClient.sendCommand([
            'BF.EXISTS', 'usernames', username
        ]);

        //if bloom filter says exists, make sure to check in the db also
        if (Number(exists) == 1) {
            const user = await findUserName({ username: username });
            if (user) {
                throw new AppError("Username already exists, try different usernames", 400);
            }
        }

        //2. check if email is already used 
        const userEmail = await findUserByEmail({ email: email });
        if (userEmail) {
            throw new AppError("User already exists", 400);
        }

        //3. insert new user;
        const hashPassword = await HashPassword({password : password});
        await UserSignUp({ userpassword: hashPassword, email: email, username: username });

        //4. update bloom filters
        await RedisClient.sendCommand([
            'BF.ADD', 'usernames', username
        ]);

        return res.status(201).json({
            message: "User has been created"
        })
}

module.exports = SignupService;
