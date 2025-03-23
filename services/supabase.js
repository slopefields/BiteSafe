import { createClient } from '@supabase/supabase-js';
import { SUPABASE_KEY } from '@env';

const supabaseUrl = 'https://rftnajaquvoddvgqwxgg.supabase.co';

export const supabaseClient = createClient(supabaseUrl, SUPABASE_KEY);
