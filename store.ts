
import { create } from 'zustand';
import { User, UserRole } from './types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));

interface CartItem {
  id: string;
  title: string;
  price: number;
  instructor: string;
  thumbnail: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ 
    items: state.items.find(i => i.id === item.id) ? state.items : [...state.items, item] 
  })),
  removeItem: (id) => set((state) => ({ items: state.items.filter(i => i.id !== id) })),
  clearCart: () => set({ items: [] }),
}));

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'alert';
  time: string;
  read: boolean;
}

interface NotificationState {
  notifications: Notification[];
  addNotification: (n: Notification) => void;
  markAsRead: (id: string) => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [
    { id: '1', title: 'New Course Available', message: 'Mastering Rust is now live!', type: 'info', time: '2h ago', read: false },
    { id: '2', title: 'Performance Alert', message: 'AI suggests reviewing Module 4 in React Patterns.', type: 'alert', time: '5h ago', read: false }
  ],
  addNotification: (n) => set((state) => ({ notifications: [n, ...state.notifications] })),
  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
  })),
  clearAll: () => set({ notifications: [] }),
}));
