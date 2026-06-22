const sequelize = require('./Db/DbConfig');
const RedisClient = require('./Redis/RedisConfig');

module.exports = {sequelize, RedisClient};