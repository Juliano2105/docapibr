import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  req.id = req.headers['x-request-id'] as string || uuidv4();
  
  const start = Date.now();
  const { method, originalUrl, ip } = req;

  // We capture the response finish to log the latency and status
  res.on('finish', () => {
    const responseTime = Date.now() - start;
    const statusCode = res.statusCode;

    // Here we could also push to the requests_log table in background
    console.log(`[${new Date().toISOString()}] ${method} ${originalUrl} ${statusCode} ${responseTime}ms - ${ip} - req_id: ${req.id}`);
  });

  next();
};
