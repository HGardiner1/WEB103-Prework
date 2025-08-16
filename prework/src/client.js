import { createClient } from '@supabase/supabase-js';
const URL = 'https://broukultazzbacjbpqrp.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyb3VrdWx0YXp6YmFjamJwcXJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2ODU4NTUsImV4cCI6MjA2NjI2MTg1NX0.d6fdDpYp3T1_KOv3XvzjGr5qMBHBcUbS0nEd2mQUfGE';
const supabase = createClient(URL, API_KEY);
export default supabase;




