import { create } from 'zustand';
import {
  getCurrentUser,
  login as loginService,
  logout as logoutService,
  signup as signupService,
} from '../services/authService';
import type { User } from '../types/User';

interface AuthState {
  user: User | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitializing: boolean;
  initialize: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: undefined,
  isAuthenticated: false,
  isLoading: false,
  isInitializing: true,

  initialize: async () => {
    try {
      const user = await getCurrentUser();
      set({ user, isAuthenticated: user !== undefined, isInitializing: false });
    } catch (error: unknown) {
      console.error('Sessie controleren mislukt:', error);
      set({ user: undefined, isAuthenticated: false, isInitializing: false });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const user = await loginService(email, password);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  signup: async (name, email, password) => {
    set({ isLoading: true });
    try {
      await signupService(name, email, password);
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      await logoutService();
    } finally {
      set({ user: undefined, isAuthenticated: false });
    }
  },
}));