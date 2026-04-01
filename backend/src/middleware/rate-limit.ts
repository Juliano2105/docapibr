import { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { sendError } from '../utils/responses';

// In a real app we would use RateLimiterRedis or check the user's plan limits dynamically
const defaultLimiter = new RateLimiterMemory({
  points: 30, // 30 requests
  duration: 60, // per 60 seconds by IP
});

export const rateLimitMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  // If authenticated client has dynamic limits from DB, we'd adjust points here.
  // Using IP as fallback identifier if no clientId is present yet
  const identifier = req.clientId || req.ip;
  const points = req.clientPlan?.rate_limit_minute || 30;

  const dynamicLimiter = new RateLimiterMemory({
    points,
    duration: 60,
  });

  try {
    await dynamicLimiter.consume(identifier || 'unknown');
    next();
  } catch (rejRes) {
    sendError(res, 'RATE_LIMIT_EXCEEDED', 'Muitas requisicoes, tente novamente mais tarde.', 429);
  }
};
