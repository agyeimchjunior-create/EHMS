import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mbcpfsbkohauwmuaexjs.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable___uVCU67oEa_tH0OtWFoig_jlK9zWZA';

export const supabase = createClient(supabaseUrl, supabaseKey);
