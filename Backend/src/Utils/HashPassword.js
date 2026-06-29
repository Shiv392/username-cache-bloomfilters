const bcrypt = require('bcrypt');
const AppError = require('./AppError');

const SALT = Number(process.env.BCRYPT_SALT_ROUND);

const HashPassword = async({password})=>{
try{
 if(!password || typeof password!== 'string'){
    throw new AppError("Password should be string", 400);
    return;
 }

 if(password.trim().length==0){
    throw new AppError("Password should not be empty");
    return;
 }

 const salt = await bcrypt.genSalt(SALT);
 const hashPassword = await bcrypt.hash(password, salt);
 return hashPassword;
}
catch(err){
    throw new AppError("Failed to Hash password", 500);
}
}


module.exports = HashPassword;