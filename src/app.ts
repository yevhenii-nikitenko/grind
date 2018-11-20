import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { router } from './routes/routes';
import requestLogger from './middleware/requests.logger';

const app: Application = express();

app.use(cookieParser());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use('/', requestLogger, router);

app.use('*', async (req: Request, res: Response) => {
    res.status(404).send('not found');
});

export = app;