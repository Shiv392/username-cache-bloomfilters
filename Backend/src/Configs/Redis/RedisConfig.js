const {createClient} = require('redis');
const logger = require('../../Utils/Logger');

const RedisClient = createClient({
    // username : process.env.REDIS_USERNAME,
    // password : process.env.REDIS_PASSWORD,
    url :  `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_URL}:${process.env.REDIS_PORT}`
});

RedisClient.on("error", err=> logger.error(err));

module.exports = RedisClient;