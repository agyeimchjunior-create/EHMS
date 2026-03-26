import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

// Backend can also use SUPABASE_SERVICE_ROLE_KEY for admin/privileged operations if needed.
export const supabase = createClient(supabaseUrl, supabaseKey);
