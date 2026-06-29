const {UserSchema} = require('../Schemas/index');
const {RedisClient} = require('../Configs/index');

const findUserByEmail = async({email})=>{
    const [user] = await UserSchema.sequelize.query(
        `select email from Users where email = ? limit 1`,
        {
            replacements : [email]
        }
    );

    return user[0] || null;
}

const findUserName = async({username})=>{
    const [user] = await UserSchema.sequelize.query(
        `select * from Users where username = ? limit 1 `,
        {
            replacements : [username]
        }
    );

    return user[0] || null;
}

const UserSignUp = async({email, username, userpassword})=>{
     const res = await UserSchema.create({
        Email : email,
        UserName : username,
        UserPassword : userpassword
     })

     return res;
}

module.exports = {findUserByEmail, findUserName, UserSignUp};