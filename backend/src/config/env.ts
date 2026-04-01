import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const env = {
  APP_ENV: process.env.APP_ENV || 'development',
  APP_URL: process.env.APP_URL || 'http://localhost:5173',
  API_URL: process.env.API_URL || 'http://localhost:3001',
  CPF_API_BASE_URL: process.env.CPF_API_BASE_URL || 'https://api.cpf-brasil.org',
  CPF_API_KEY: process.env.CPF_API_KEY || '',
  CNPJ_API_BASE_URL: process.env.CNPJ_API_BASE_URL || 'https://brasilapi.com.br/api',
  SUPABASE_URL: process.env.SUPABASE_URL || '',
  SUPABASE_KEY: process.env.SUPABASE_KEY || '',
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || '',
  JWT_SECRET: process.env.JWT_SECRET || 'fallback_secret',
  RATE_LIMIT_MAX_PER_MINUTE: parseInt(process.env.RATE_LIMIT_MAX_PER_MINUTE || '30', 10),
  RATE_LIMIT_MAX_PER_DAY: parseInt(process.env.RATE_LIMIT_MAX_PER_DAY || '1000', 10),
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  PORT: parseInt(process.env.PORT || '3001', 10),
};
