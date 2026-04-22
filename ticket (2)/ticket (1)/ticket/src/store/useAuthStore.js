import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    user: null, // { name: 'Ahmet', role: 'Student' }
    isAuthenticated: false,

    // Giriş yapma fonksiyonu
    login: (userData) => set({ user: userData, isAuthenticated: true }),

    // Çıkış yapma fonksiyonu
    logout: () => set({ user: null, isAuthenticated: false }),
}));