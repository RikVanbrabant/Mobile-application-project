export const ROLES = ['admin', 'redder', 'bezoeker'] as const;

export type Role = (typeof ROLES)[number];

export function isRole(value: unknown): value is Role {
  return ROLES.some((role) => role === value);
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  token: string;
}