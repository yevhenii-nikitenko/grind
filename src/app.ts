import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import requestLogger from './middleware/requests.logger';
import router from './routes/routes';
import cors from './middleware/cors';

import Signal from './services/signal';
import Pricing from './oanda/pricing';

const pricing = new Pricing('101-004-9834176-001');
const signal = new Signal(pricing);
signal.runStream();
signal.priceStream.on('tick', (data) => {
	console.log('tick: ', data)
})

const app: Application = express();

app.use(cors());

app.use(cookieParser());

app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);

app.use(bodyParser.json());

app.use('/', requestLogger, router);

app.use('*', async (req: Request, res: Response) => {
	res.status(404).send('not found');
});

export = app;
