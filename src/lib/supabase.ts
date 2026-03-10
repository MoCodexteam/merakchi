import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

// These environment variables will be set in production
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// Admin credentials - in production, use proper authentication
export const ADMIN_EMAIL = 'admin@merakchimeuble.com';
export const ADMIN_PASSWORD = 'Merakchi2024!';
