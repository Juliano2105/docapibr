import { Router, Request, Response } from 'express';
import { rateLimitMiddleware } from '../middleware/rate-limit';
import { validateKey } from '../services/apiKeyService';
import { isValidCPF, isValidCNPJ, stripMask } from '../utils/cpfCnpjValidator';
import { queryCpf } from '../services/cpfService';
import { queryCnpj } from '../services/cnpjService';
import { getCache, setCache } from '../services/cacheService';

const publicRouter = Router();

// Middleware that specifically forces memory API Check over the external requests
const authorizePublicApiKey = (req: Request, res: Response, next: import('express').NextFunction): void => {
  const token = req.headers['x-api-key'] as string;
  
  if (!token) {
    res.status(401).json({ success: false, error: 'API Key Ausente (Provide X-API-Key Header)' });
    return;
  }
  
  const validUser = validateKey(token);
  if (!validUser || !validUser.active) {
    res.status(401).json({ success: false, error: 'API key invalida, suspensa, ou revogada.' });
    return;
  }
  
  // Attach the known client for any rate limiters
  req.clientId = validUser.clientId;
  req.apiKeyId = validUser.id;
  next();
};

publicRouter.use(authorizePublicApiKey);
// Re-uses global simple rate limiter inside standalone setup
publicRouter.use(rateLimitMiddleware);

publicRouter.get('/cpf/:cpf', async (req: Request, res: Response) => {
  const start = Date.now();
  try {
    const rawCpf = req.params.cpf;
    const cpf = stripMask(rawCpf);

    if (!isValidCPF(cpf)) {
      res.status(400).json({ success: false, error: 'O CPF deve conter 11 digitos numericos validos.' });
      return;
    }

    const cacheKey = `cpf:${cpf}`;
    const cached = await getCache(cacheKey);

    if (cached) {
      res.status(200).json({
        success: true,
        data: cached,
        meta: { cached: true, response_time_ms: Date.now() - start }
      });
      return;
    }

    const data = await queryCpf(cpf);
    await setCache(cacheKey, 'cpf_brasil', data);

    res.status(200).json({
      success: true,
      data: data,
      meta: { cached: false, response_time_ms: Date.now() - start }
    });
  } catch (err: any) {
    res.status(err.httpStatus || 500).json({
      success: false,
      error: err.message || 'Erro ao consultar CPF.'
    });
  }
});

publicRouter.get('/cnpj/:cnpj', async (req: Request, res: Response) => {
  const start = Date.now();
  try {
    const rawCnpj = req.params.cnpj;
    const cnpj = stripMask(rawCnpj);

    if (!isValidCNPJ(cnpj)) {
      res.status(400).json({ success: false, error: 'O CNPJ deve conter 14 digitos numericos validos.' });
      return;
    }

    const cacheKey = `cnpj:${cnpj}`;
    const cached = await getCache(cacheKey);

    if (cached) {
      res.status(200).json({
        success: true,
        data: cached,
        meta: { cached: true, response_time_ms: Date.now() - start }
      });
      return;
    }

    const data = await queryCnpj(cnpj);
    await setCache(cacheKey, 'brasilapi', data);

    res.status(200).json({
      success: true,
      data: data,
      meta: { cached: false, response_time_ms: Date.now() - start }
    });
  } catch (err: any) {
    res.status(err.httpStatus || 500).json({
      success: false,
      error: err.message || 'Erro ao consultar CNPJ.'
    });
  }
});

export default publicRouter;
