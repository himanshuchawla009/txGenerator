const winston = require('winston');
const fs = require('fs');
const env = require('./env');
const logDir = 'log';

// set the log level based on envionment variable
let level;
if (env == 'development') {
    level = 'debug';
} else {
    level = 'info';
}

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const colorizer = winston.format.colorize();

const logger = winston.createLogger({ // eslint-disable-line
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple(),
        winston.format.printf(msg =>
            colorizer.colorize(msg.level, `${msg.timestamp} - ${msg.level}: ${msg.message}`)
        )
    ),
    transports: [
        new winston.transports.Console({ // eslint-disable-line
            'level': level
        }),
        new (require('winston-daily-rotate-file'))({
            filename: `${logDir}/-results-%DATE%.log`,
            datePattern: 'YYYY-MM-DD',
            // prepend: true,
            level: env === 'development' ? 'verbose' : 'info'
        })
    ]
});


logger.stream = {
    write: function (message, encoding) { // eslint-disable-line
        logger.info(message);
    }
};

module.exports = logger;
