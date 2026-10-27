import type { Session } from '@supabase/supabase-js';
import { isRole, type User } from '../types/User';
import { supabase } from './supabaseClient';

/** Combines the Supabase session with our own profile (name + role). */
async function toUser(session: Session): Promise<User> {
  const { data, error } = await supabase
    .from('profiles')
    .select('display_name, role')
    .eq('id', session.user.id)
    .single();
  if (error !== null) throw error;

  const name: unknown = data.display_name;
  const role: unknown = data.role;
  const email = session.user.email ?? '';

  return {
    id: session.user.id,
    email,
    name: typeof name === 'string' ? name : email,
    role: isRole(role) ? role : 'bezoeker',
    token: session.access_token,
  };
}

export async function login(email: string, password: string): Promise<User> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error !== null) throw error;
  return toUser(data.session);
}

export async function signup(name: string, email: string, password: string): Promise<void> {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { display_name: name } },
  });
  if (error !== null) throw error;

  // Supabase logs a new account in right away; we want the user to log in themselves
  const { error: signOutError } = await supabase.auth.signOut();
  if (signOutError !== null) throw signOutError;
}

/** The user that is still logged in from last time, if any. */
export async function getCurrentUser(): Promise<User | undefined> {
  const { data, error } = await supabase.auth.getSession();
  if (error !== null) throw error;
  if (data.session === null) return undefined;
  return toUser(data.session);
}

export async function logout(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error !== null) throw error;
}