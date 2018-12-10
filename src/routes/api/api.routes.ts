import { Router } from 'express';

import Account from '../../oanda/account';
import Pricing from '../../oanda/pricing';

const API: Router = Router();

const pricing = new Pricing('101-004-9834176-001');

API.get('/test', (req, res) => {
	pricing.price(['EUR_USD'])
		.then(accounts => {
			res.send(accounts);
		})
		.catch(err => {
			res.status(404).send(err);
		});
});

export default API;
