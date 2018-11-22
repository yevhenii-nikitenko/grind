import { Router } from 'express';

import Account from '../../oanda/account';

const API: Router = Router();

API.get('/test', (req, res) => {
    console.log('test')
    Account.allAccounts((err, data) => {
        if (err) {
            res.status(404).send({
                error: err
            })
        } else {
            res.send(data);
        }
    })
});

export default API;