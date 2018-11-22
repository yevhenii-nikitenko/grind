import { Router } from 'express';
import API from './api/api.routes';

const router: Router = Router();

router.use('/api/v1', API);

export default router;