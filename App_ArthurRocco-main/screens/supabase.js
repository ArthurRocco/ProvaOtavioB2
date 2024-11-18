import { createClient } from '@supabase/supabase-js';

const supabaseUrl = '(Link do supabase)';
const supabaseKey = '(API KEY do supabase)';
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };