
import { createLogger, transports, format } from 'winston';
import path from 'path';
import fs from 'fs';

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.json(),
        format.printf(info => `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`)
    ),
    transports: [
        new transports.Console({
            level: 'info',
            handleExceptions: true,
            format: format.combine(
                format.colorize(),
                format.label({ label: '|' }),
                format.printf(info => {
                    return `[${info.timestamp}] ${info.label} ${info.level}: ${info.message}`;
                }),
            ),
        }),
        new transports.Stream({
            stream: fs.createWriteStream(path.join(process.cwd(), 'logs', 'stream.log')),
            level: 'error',
            format: format.combine(
                format.printf(info => `${info.timestamp} | ${info.message}`),
            ),
        }),
        new transports.File({
            level: 'info',
            handleExceptions: true,
            maxsize: 5242880,
            maxFiles: 5,
            filename: path.join(process.cwd(), 'logs', 'app.log'),
        })
    ]
});

export {
    logger
};