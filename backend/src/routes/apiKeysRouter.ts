import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';
import { createKey, listKeys, revokeKey, findAllKeysAdmin, toggleKeyAdmin } from '../services/apiKeyService';

const router = Router();

// Regular User Dashboard endpoints for keys
router.post('/api-keys', authenticate, (req: Request, res: Response) => {
  const { name } = req.body;
  
  if (!name) {
    res.status(400).json({ success: false, error: 'O nome da chave é obrigatório' });
    return;
  }

  // Uses mocked user injected by middleware (req.clientId)
  const clientIdentifier = req.clientId || 'mock-client';

  const newKey = createKey(clientIdentifier, name);
  res.status(201).json({ success: true, data: newKey });
});

router.get('/api-keys', authenticate, (req: Request, res: Response) => {
  const clientIdentifier = req.clientId || 'mock-client';
  
  const keys = listKeys(clientIdentifier);
  res.status(200).json({ success: true, data: keys });
});

router.delete('/api-keys/:id', authenticate, (req: Request, res: Response) => {
  const clientIdentifier = req.clientId || 'mock-client';
  const { id } = req.params;

  const deleted = revokeKey(clientIdentifier, id);
  if (deleted) {
    res.status(200).json({ success: true, message: 'Chave revogada com sucesso' });
  } else {
    res.status(404).json({ success: false, error: 'Chave nao encontrada ou nao pertence a você' });
  }
});

// Admin-only endpoints to manage keys system-wide
router.get('/admin/api-keys', authenticate, (req: Request, res: Response) => {
  if (req.user?.role !== 'admin') {
    res.status(403).json({ success: false, error: 'Acesso restrito' });
    return;
  }
  
  const allKeys = findAllKeysAdmin();
  res.status(200).json({ success: true, data: allKeys });
});

router.patch('/admin/api-keys/:id/toggle', authenticate, (req: Request, res: Response) => {
  if (req.user?.role !== 'admin') {
    res.status(403).json({ success: false, error: 'Acesso restrito' });
    return;
  }
  
  const { id } = req.params;
  const toggled = toggleKeyAdmin(id);
  
  if (toggled) {
    res.status(200).json({ success: true, data: toggled });
  } else {
    res.status(404).json({ success: false, error: 'Chave nao encontrada.' });
  }
});

export default router;
