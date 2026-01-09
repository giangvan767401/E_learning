
import { create } from 'zustand';
import { User, UserRole } from './types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null, // Default null for mock behavior
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));

interface TrackingState {
  logs: any[];
  addLog: (log: any) => void;
  clearLogs: () => void;
}

export const useTrackingStore = create<TrackingState>((set) => ({
  logs: [],
  addLog: (log) => set((state) => ({ logs: [...state.logs, { ...log, timestamp: Date.now() }] })),
  clearLogs: () => set({ logs: [] }),
}));
