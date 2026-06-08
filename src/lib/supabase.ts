import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fycresqsgjqpfgvarxxq.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5Y3Jlc3FzZ2pxcGZndmFyeHhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MTI4ODgsImV4cCI6MjA5NjQ4ODg4OH0.dgn7Rp8FjPBTkocSfvABOFB83J9mtJz_rrsCAtQc9_k';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
