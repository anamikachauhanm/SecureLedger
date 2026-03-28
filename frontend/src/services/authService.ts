import api from './api';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  theme: 'dark' | 'light';
  currency: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

const authService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    console.log('🔗 authService.login called with email:', payload.email);
    console.log('📨 Sending POST to /auth/login');
    const response = await api.post('/auth/login', payload);
    console.log('📥 Response data:', response.data);
    return response.data;
  },

  signup: async (payload: SignupPayload): Promise<AuthResponse> => {
    const response = await api.post('/auth/signup', payload);
    return response.data;
  },

  me: async (): Promise<User> => {
    const response = await api.get('/auth/me');
    return response.data.user;
  },

  updateTheme: async (theme: 'dark' | 'light'): Promise<User> => {
    const response = await api.patch('/auth/theme', { theme });
    return response.data.user;
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};

export default authService;
