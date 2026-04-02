import { Router, Request, Response } from 'express';
import { supabase } from '../config/db';
import { sendSuccess, sendError } from '../utils/responses';
import { authenticate } from '../middleware/auth';

const router = Router();

// GET /v1/admin/clients - Lista todos os clientes cadastrados
router.get('/clients', authenticate, async (req: Request, res: Response) => {
  try {
    const { data: clients, error } = await supabase
      .from('clients')
      .select(`
        id,
        name,
        email,
        status,
        created_at,
        plans (
          name
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      return sendError(res, 'DB_ERROR', error.message, 500);
    }

    sendSuccess(res, { clients: clients || [] }, 'admin');
  } catch (err) {
    sendError(res, 'INTERNAL_ERROR', 'Erro interno ao listar clientes.', 500);
  }
});

export default router;
