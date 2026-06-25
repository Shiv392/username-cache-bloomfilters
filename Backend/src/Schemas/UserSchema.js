const { DataTypes } = require('sequelize');
const sequelize = require('../Configs/DB/DbConfig');

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
        indexes : [{
            fields : ['UserId']
        },
        {
            fields : ['Email']
        }
    ]
    },
);

module.exports = UserSchema;