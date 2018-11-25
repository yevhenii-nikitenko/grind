import { Router } from 'express';

import Account from '../../oanda/account';

const API: Router = Router();

API.get('/test', (req, res) => {
	Account.accountSummary('101-004-9834176-001')
		.then(accounts => {
			res.send(accounts);
		})
		.catch(err => {
			res.status(404).send(err);
		});
});

export default API;
