const {UserSchema} = require('../Schemas/index');
const {RedisClient} = require('../Configs/index');

const findUserByEmail = async({email})=>{
    const [user] = await UserSchema.sequelize.query(
        `select * from User where email = ? limit 1`,
        {
            replacements : [email]
        }
    );

    return user[0] || null;
}

const findUserName = async({username})=>{
    const [user] = await UserSchema.sequelize.query(
        `select * from User where username = ? limit 1 `,
        {
            replacements : [username]
        }
    );

    return user[0] || null;
}

const UserSignUp = async({name, email, username})=>{
     const res = await UserSchema.sequelize.query(
        `insert into User(name, email, username) values (?, ?, ?)`
        ,{
            replacements : [name, email, username]
        }
     );

     return res;
}

module.exports = {findUserByEmail, findUserName, UserSignUp};