import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { supabase } from '../config/db';
import { env } from '../config/env';
import { sendSuccess, sendError } from '../utils/responses';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return sendError(res, 'MISSING_FIELDS', 'Nome, e-mail e senha obrigatorios.');
    }

    // Default plan is 'Free'
    const { data: plan } = await supabase.from('plans').select('id').eq('name', 'Free').single();
    if (!plan) return sendError(res, 'SYSTEM_ERROR', 'Plano basico nao encontrado.', 500);

    // Create client
    const { data: client, error: clientErr } = await supabase
      .from('clients')
      .insert({ name, email, plan_id: plan.id })
      .select()
      .single();

    if (clientErr) {
      return sendError(res, 'DB_ERROR', clientErr.message, 400);
    }

    // Create User
    const hash = await bcrypt.hash(password, 10);
    const { data: user, error: userErr } = await supabase
      .from('users')
      .insert({ client_id: client.id, name, email, password_hash: hash, role: 'client' })
      .select('id, name, email, role')
      .single();

    if (userErr) {
      // rollback client would be good here, omitting for simplicity
      return sendError(res, 'DB_ERROR', userErr.message, 400);
    }

    sendSuccess(res, { user, client: { id: client.id, name: client.name } }, 'auth');
  } catch (error) {
    sendError(res, 'INTERNAL_ERROR', 'Erro interno ao registrar.', 500);
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return sendError(res, 'MISSING_FIELDS', 'E-mail e senha obrigatorios.');
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return sendError(res, 'INVALID_CREDENTIALS', 'Credenciais invalidas.', 401);
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return sendError(res, 'INVALID_CREDENTIALS', 'Credenciais invalidas.', 401);
    }

    if (user.status !== 'active') {
      return sendError(res, 'USER_INACTIVE', 'Usuario inativo.', 403);
    }

    const token = jwt.sign(
      { userId: user.id, clientId: user.client_id, role: user.role },
      env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    sendSuccess(res, { token, user: { id: user.id, name: user.name, role: user.role } }, 'auth');
  } catch (error) {
    sendError(res, 'INTERNAL_ERROR', 'Erro interno ao realizar login.', 500);
  }
});

router.post('/logout', (req: Request, res: Response) => {
  // Invalidating token is client side usually (removing from storage)
  sendSuccess(res, { message: 'Logout successful' }, 'auth');
});

export default router;
