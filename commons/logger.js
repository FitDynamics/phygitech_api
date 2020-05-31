const config = require("../config/config");
const { createLogger, format, transports } = require('winston');
//const path = require('path');

const logger = function (filename) {

    var userId = "";

    return createLogger({
        // const logger = createLogger({
        level: config.logLevel,
        format: format.combine(
            format.label({ label: filename }),//path.basename(process.mainModule.filename) }),
            format.colorize(),
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            format.printf(
                info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message} ${userId} `
            )
        ),
        transports: [new transports.Console()]
    });
};

module.exports = logger;