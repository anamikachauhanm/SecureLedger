import React, { createContext, useContext, useEffect, useState } from 'react';
import authService, { User } from '../services/authService';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateTheme: (theme: 'dark' | 'light') => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchCurrentUser(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchCurrentUser = async (token: string) => {
    try {
      const userData = await authService.me();
      setUser(userData);
      // Apply theme from user data
      if (userData.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      setError(null);
    } catch (err) {
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔐 AuthContext.login called');
      console.log('📡 Making API request to /auth/login');
      const response = await authService.login({ email, password });
      console.log('✅ API response received:', response);
      console.log('💾 Setting token...');
      localStorage.setItem('token', response.token);
      setToken(response.token);
      
      // Set user from response
      if (response.user) {
        console.log('📝 Setting user from response:', response.user);
        setUser(response.user);
        // Apply theme
        if (response.user.theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } else {
        console.log('⚠️ No user in response, fetching user data...');
        try {
          const userData = await authService.me();
          console.log('📝 Fetched user data:', userData);
          setUser(userData);
          // Apply theme
          if (userData.theme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        } catch (err) {
          console.warn('⚠️ Failed to fetch user data:', err);
        }
      }
      console.log('✨ Login complete - user should be set');
    } catch (err: any) {
      console.error('❌ AuthContext.login error:', err);
      console.error('Error response:', err.response?.data);
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔑 AuthContext.signup called');
      const response = await authService.signup({ name, email, password });
      console.log('✅ API response received:', response);
      localStorage.setItem('token', response.token);
      setToken(response.token);
      
      if (response.user) {
        console.log('📝 Setting user from response:', response.user);
        setUser(response.user);
        // Apply theme
        if (response.user.theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } else {
        console.log('⚠️ No user in response, fetching user data...');
        try {
          const userData = await authService.me();
          console.log('📝 Fetched user data:', userData);
          setUser(userData);
          // Apply theme
          if (userData.theme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        } catch (err) {
          console.warn('⚠️ Failed to fetch user data:', err);
        }
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Signup failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
    setError(null);
    // Remove dark class on logout
    document.documentElement.classList.remove('dark');
  };

  const updateTheme = async (theme: 'dark' | 'light') => {
    try {
      console.log('🌙 updateTheme called with theme:', theme);
      const updatedUser = await authService.updateTheme(theme);
      console.log('✅ updateTheme API response:', updatedUser);
      setUser(updatedUser);
      
      // Apply theme to HTML element immediately
      console.log('🎨 Applying theme to HTML element:', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        console.log('✅ Added dark class, classList:', document.documentElement.classList);
      } else {
        document.documentElement.classList.remove('dark');
        console.log('✅ Removed dark class, classList:', document.documentElement.classList);
      }
      
      setError(null);
    } catch (err: any) {
      console.error('❌ updateTheme error:', err);
      const errorMessage = err.response?.data?.message || 'Failed to update theme';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        login,
        signup,
        logout,
        updateTheme,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
