const {RedisClient} = require('../Configs/index');
const {findUserName} = require('../Repository/index');
const AppError = require('../Utils/AppError');

const UserNameService = async(req, res)=>{
const username = req.query.username;
if(!username){
    throw new AppError("Username is required", 400);
}

const exists = await RedisClient.sendCommand([
    'BF.EXISTS', 'usernames', username
]);

//if Bloom filter say not available, make sure to db also
if(Number(exists) == 1){
    const userExits = await findUserName({username : username});
    if(userExits){
        throw new AppError("Username already exists, try different usernames", 400);
    }
}

//if available then return true;
else{
    return res.status(200).json({
        message : "Username is available"
    })
}
}

module.exports = UserNameService;