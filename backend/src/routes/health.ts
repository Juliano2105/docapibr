import { Router, Request, Response } from 'express';
import { sendSuccess } from '../utils/responses';

const router = Router();

router.get('/', (req: Request, res: Response) => 
  sendSuccess(res, {
    status: 'ok',
    version: '1.0.0',
    uptime: process.uptime(),
  }, 'system');
});

export default router;
