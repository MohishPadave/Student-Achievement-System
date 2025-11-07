import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../services/axiosInstance";

export const useAuthStore = create((set, get) => ({
  user: null,
  loading: true,
  token: localStorage.getItem('jwt') || null,

  login: async (email, password) => {
    console.log('🔐 Login attempt:', { email, password: '***' });
    console.log('🌐 Backend URL:', axiosInstance.defaults.baseURL);
    
    try {
      console.log('📤 Sending login request...');
      const { data } = await axiosInstance.post('auth/login', { email, password });
      console.log('📥 Login response:', data);
      
      if (data.success) {
        console.log('✅ Login successful');
        get().setToken(data.token);
        set({ user: data.user });
        toast.success('Login successful!');
        return { success: true };
      } else {
        console.log('❌ Login failed - success: false');
        toast.error('Login failed');
        return { success: false, error: 'Login failed' };
      }
    } catch (error) {
      console.error('💥 Login error:', error);
      console.error('📊 Error response:', error.response);
      console.error('📝 Error data:', error.response?.data);
      console.error('🔢 Error status:', error.response?.status);
      console.error('🌐 Error config:', error.config);
      
      const message = error.response?.data?.error || error.message || 'Login failed';
      console.error('❌ Final error message:', message);
      toast.error(message);
      return { success: false, error: message };
    }
  },

  getTestAccounts: async () => {
    try {
      const { data } = await axiosInstance.get('auth/test-accounts');
      return data.accounts;
    } catch (error) {
      console.error('Failed to fetch test accounts:', error);
      return [];
    }
  },

  setToken: (token) => {
    localStorage.setItem('jwt', token);
    set({ token });
    // Set axios default header
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  checkAuth: async () => {
    set({ loading: true });
    const token = localStorage.getItem('jwt');
    
    if (!token) {
      set({ user: null, loading: false });
      return;
    }

    try {
      // Set authorization header
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const { data } = await axiosInstance.get('auth/profile');
      set({ user: data.user });
    } catch {
      localStorage.removeItem('jwt');
      set({ user: null, token: null });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.get('auth/logout');
      localStorage.removeItem('jwt');
      delete axiosInstance.defaults.headers.common['Authorization'];
      set({ user: null, token: null });
      toast.success('Logged out successfully');
      // Redirect to login page
      window.location.href = '/login';
    } catch (err) {
      console.error('Logout failed:', err);
      toast.error('Logout failed');
      // Even if API call fails, clear local state
      localStorage.removeItem('jwt');
      delete axiosInstance.defaults.headers.common['Authorization'];
      set({ user: null, token: null });
      window.location.href = '/login';
    }
  },
}));