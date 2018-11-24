import fs from 'fs';
import normalizePort from '../utils/normalize-port';

const { NODE_ENV, LOG_LEVEL, PORT } = process.env;

const config = JSON.parse(fs.readFileSync(`${__dirname}/${NODE_ENV}.config.json`, 'utf8'));

config.app.port = normalizePort(PORT || config.app.port);
config.logger.level = LOG_LEVEL || config.logger.level;

export default config;
