import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any;
      clientId?: string;
      apiKeyId?: string;
      clientPlan?: any;
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // Mock authentication for standalone usage
  req.user = { id: 'mock', role: 'admin' };
  req.clientId = 'mock-client';
  req.clientPlan = { rate_limit_minute: 100, rate_limit_day: 10000 };
  
  next();
};
