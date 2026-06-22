const winston = require('winston');

const logger = winston.createLogger(
{
    level : 'info', //level of the logs 
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports : [
        new winston.transports.Console(), //will print logs in the terminal
        new winston.transports.File({
            filename : 'src/logs/app.log'
        })
    ]
}
);

module.exports = logger;