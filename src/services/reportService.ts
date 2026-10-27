import { supabase } from './supabaseClient';

export async function getActiveReports(municipality: string) {
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .eq('municipality', municipality)
    .eq('status', 'active');

  if (error !== null) throw error;
  return data;
}