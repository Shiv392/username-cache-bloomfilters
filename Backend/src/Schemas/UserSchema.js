const { DataTypes } = require('sequelize');
const {sequelize} = require('../Configs/index');

console.log("User Schema defined");

const UserSchema = sequelize.define(
    'User',

    //table column fields
    {
        UserId : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            unique : true,
            autoIncrement : true
        },
        Email : {
            type : DataTypes.STRING,
            unique : true,
            allowNull : false
        },
        UserName : {
            type : DataTypes.STRING,
            unique : true,
            allowNull : false
        },
        UserPassword : {
            type : DataTypes.STRING,
            allowNull : true,
        }
    },
    {
        timestamps : true,
        createdAt : true, 
        tableName : 'Users',
    //     indexes : [{
    //         fields : ['UserId']
    //     },
    //     {
    //         fields : ['Email']
    //     }
    // ]
    },
);

console.log("After define:", Object.keys(sequelize.models));
console.log(UserSchema === sequelize.models.User);
module.exports = UserSchema;