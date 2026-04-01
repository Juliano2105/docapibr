import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';
import { rateLimitMiddleware } from '../middleware/rate-limit';
import { isValidCPF, isValidCNPJ, stripMask } from '../utils/cpfCnpjValidator';
import { queryCpf } from '../services/cpfService';
import { queryCnpj } from '../services/cnpjService';
import { getCache, setCache } from '../services/cacheService';
import { sendSuccess, sendError } from '../utils/responses';

const router = Router();

// Apply auth and rate limiting to all lookup routes
router.use(authenticate);
router.use(rateLimitMiddleware);

router.get('/cpf/:cpf', async (req: Request, res: Response) => {
  const start = Date.now();
  try {
    const rawCpf = req.params.cpf;
    const cpf = stripMask(rawCpf);

    if (!isValidCPF(cpf)) {
      return sendError(res, 'INVALID_CPF_FORMAT', 'O CPF deve conter 11 digitos numericos validos.', 400, { request_id: req.id });
    }

    const cacheKey = `cpf:${cpf}`;
    const cached = await getCache(cacheKey);

    if (cached) {
      return sendSuccess(res, cached, 'cache_cpf', {
        cached: true,
        response_time_ms: Date.now() - start,
        request_id: req.id,
      });
    }

    const data = await queryCpf(cpf);
    await setCache(cacheKey, 'cpf_brasil', data);

    return sendSuccess(res, data, 'cpf_brasil', {
      cached: false,
      response_time_ms: Date.now() - start,
      request_id: req.id,
    });
  } catch (err: any) {
    return sendError(
      res, 
      err.code || 'INTERNAL_ERROR', 
      err.message || 'Erro ao consultar CPF.', 
      err.httpStatus || 500, 
      { request_id: req.id }
    );
  }
});

router.get('/cnpj/:cnpj', async (req: Request, res: Response) => {
  const start = Date.now();
  try {
    const rawCnpj = req.params.cnpj;
    const cnpj = stripMask(rawCnpj);

    if (!isValidCNPJ(cnpj)) {
      return sendError(res, 'INVALID_CNPJ_FORMAT', 'O CNPJ deve conter 14 digitos numericos validos.', 400, { request_id: req.id });
    }

    const cacheKey = `cnpj:${cnpj}`;
    const cached = await getCache(cacheKey);

    if (cached) {
      return sendSuccess(res, cached, 'cache_cnpj', {
        cached: true,
        response_time_ms: Date.now() - start,
        request_id: req.id,
      });
    }

    const data = await queryCnpj(cnpj);
    await setCache(cacheKey, 'brasilapi', data);

    return sendSuccess(res, data, 'brasilapi', {
      cached: false,
      response_time_ms: Date.now() - start,
      request_id: req.id,
    });
  } catch (err: any) {
    return sendError(
      res, 
      err.code || 'INTERNAL_ERROR', 
      err.message || 'Erro ao consultar CNPJ.', 
      err.httpStatus || 500, 
      { request_id: req.id }
    );
  }
});

export default router;
