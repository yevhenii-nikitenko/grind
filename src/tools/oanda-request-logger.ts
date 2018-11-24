import { Request, Response } from 'request';
import logger from './logger';

const oandaRequestLogger = (request: Request) => {
	request.on('response', (response: Response) => {
		response.on('end', () => {
			logger.info(`${request.method} ${request.uri.href} | status: ${response.statusCode}`);
		});
		response.on('error', (err: Error) => {
			logger.info(`${request.method} ${request.uri.href} | status: ${response.statusCode}. Error: ${err}`);
		});
	});
};

export default oandaRequestLogger;
