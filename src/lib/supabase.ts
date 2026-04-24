import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ybijehcdqdmbnjqkwixa.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliaWplaGNkcWRtYm5qcWt3aXhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwMTE4ODgsImV4cCI6MjA5MjU4Nzg4OH0.W8Z2DNQqb_K-qXTKwblKKMo0_KOIlHLJSXUFSJGjYvA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);