import { Request, Response, NextFunction } from 'express';

const cors = () => {
    return (req: Request, res: Response, next: NextFunction): void => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, SN_TOKEN');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        next();
    };
};

export default cors;
