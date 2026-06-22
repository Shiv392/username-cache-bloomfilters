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
        Name : {
            type : DataTypes.STRING,
            allowNull : false
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
        }
    },
    {
        timestamps : true,
        createdAt : true,
        tableName : 'User'
    }
);

module.exports = UserSchema;