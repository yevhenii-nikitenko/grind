import { Router } from 'express';

const API: Router = Router();

API.get('/test', (req, res) => {
    res.send('hell');
});

export {
    API
}