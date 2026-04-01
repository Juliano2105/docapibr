import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env';
import { loggerMiddleware } from './middleware/logger';

import healthRouter from './routes/health';
import authRouter from './routes/auth';
import lookupRouter from './routes/lookup';
import apiKeysRouter from './routes/apiKeysRouter';
import publicRouter from './routes/publicRouter';

const app = express();

app.use(helmet());
app.use(cors({
  origin: '*', // Allows external API consuming from any origin. Keep restrictive on other endpoints natively in production.
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
}));
app.use(express.json());

app.use(loggerMiddleware);

// Routes
app.use('/v1/health', healthRouter);
app.use('/v1/auth', authRouter);
app.use('/v1', lookupRouter); // Registers /v1/cpf and /v1/cnpj
app.use('/v1', apiKeysRouter); // Mounts /v1/api-keys
app.use('/api/v1', publicRouter); // Custom External Endpoints

// Error Fallback
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: {
      code: 'SERVER_ERROR',
      message: 'Unexpected server error.',
      http_status: 500
    }
  });
});

app.listen(env.PORT, () => {
  console.log(`🚀 API Server running on port ${env.PORT} in ${env.APP_ENV} mode.`);
});
