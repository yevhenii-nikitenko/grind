import { Request, Response, NextFunction } from 'express';
import logger from '../tools/logger';

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
	res.on('finish', () => {
		logger.info(`${req.method} ${req.baseUrl} | status: ${res.statusCode}`);
	});
	next();
};

export default requestLogger;
