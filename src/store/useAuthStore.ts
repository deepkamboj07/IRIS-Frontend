import { create } from 'zustand';
import { serviceGet, servicePatch, servicePost } from '../libs/utils/apiService';
import { toast } from 'sonner';
import { setHeader } from '../libs/utils/header';

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  profileImg?: string;
  details?: any;
  totalPosts?: number;
  totalImageUploaded?: number;
}


interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  profileLoading?: boolean;
  formSumitLoading?: Map<string, boolean>;
  error: string | null;

  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, username: string, password: string) => Promise<boolean>;
  logout: () => void;

  verifyToken: () => Promise<boolean>;
  getMyProfile: () => Promise<boolean>;
  editMyProfile: (data: any, type: 'basic' | 'summary' | 'profile') => Promise<boolean>;
  uploadProfileImage: (file: File) => Promise<string>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  loading: false,
  error: null,

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await servicePost('/api/v1/auth/login', { email, password });
      const { token, user } = res.data.docs;
      set({ token, user, loading: false });
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
        toast.success('Login successful!');
      setHeader('Authorization', `Bearer ${token}`);
        return true;
    } catch (err : any) {
        console.error('Login error:', err);
        console.log("Notification error:", err?.response?.data?.message);
        toast.error(err?.response?.data?.message || 'Login failed');
      set({
        error: err?.response?.data?.message || 'Login failed',
        loading: false,
      });
        return false;
    }
  },

  register: async (email, username, password) => {
    set({ loading: true, error: null });
    try {
      await servicePost('/api/v1/auth/register', {
        email,
        username,
        password,
      });
      toast.success('Registration successful! You can now log in.');
      return true;
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || 'Registration failed',
        loading: false,
      });
      toast.error(err?.response?.data?.message || 'Registration failed');
      return false;
    }finally {
      set({ loading: false });
    }
  },
  verifyToken: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        set({ token: null, user: null });
        return false;
      }
      set({ loading: true });
      const res = await serviceGet('/api/v1/auth/verify?token=' + token);
      const { user } = res.data.docs;
      setHeader('Authorization', `Bearer ${token}`);
      set({ token, user });
      return true;
    } catch (err: any) {
      console.error('Token verification error:', err);
      toast.error('Session expired. Please log in again.');
      localStorage.removeItem('token');
      set({ token: null, user: null });
      return false;
    }finally {
      set({ loading: false });
    }
  },
  getMyProfile: async () => {
    try {
      set({ profileLoading: true });
      const res = await serviceGet('/api/v1/me');
      const { user } = res.data.docs;
      set({ user });
      return true;
    } catch (err: any) {
      console.error('Get profile error:', err);
      toast.error('Failed to fetch profile. Please try again.');
      set({ user: null });
      return false;
    }finally {
      set({ profileLoading: false });
    }
  },
  editMyProfile: async (data: any, type: 'basic' | 'summary' | 'profile') => {
    try {
      set({ formSumitLoading: new Map([[type, true]]) });
      const res = await servicePatch('/api/v1/me', data);
      const { user } = res.data.docs;
      set({ user });
      toast.success('Profile updated successfully!');
      return true;
    } catch (err: any) {
      console.error('Edit profile error:', err);
      toast.error('Failed to update profile. Please try again.');
      return false;
    } finally {
      set({ formSumitLoading: new Map([[type, false]]) });
    }
  },
  uploadProfileImage: async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await servicePost('/api/v1/upload', formData, {
        'Content-Type': 'multipart/form-data',
      });
      const { url } = res.data.docs;
      await useAuthStore.getState().editMyProfile({ profileImg: url }, 'profile');
      return url;
    } catch (err: any) {
      console.error('Upload profile image error:', err);
      toast.error('Failed to upload profile image. Please try again.');
      throw err;
    }
  },

  logout: () => {
    set({ token: null, user: null });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
}));
