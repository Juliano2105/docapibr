import { createClient } from '@supabase/supabase-js';
import { env } from './env';

if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
  console.warn('Supabase URL or Key is missing. Database operations will fail.');
}

// Default export uses the service role key to bypass RLS for backend operations
export const supabase = createClient(
  env.SUPABASE_URL || 'https://placeholder.supabase.co',
  env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_key'
);
