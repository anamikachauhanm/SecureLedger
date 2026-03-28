import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl -z-10"></div>

      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <div className="auth-icon">📊</div>
          <div>
            <h1 className="auth-title">SecureLedger</h1>
            <p className="auth-subtitle">Personal Finance Manager</p>
          </div>
        </div>

        {/* Login Heading */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Track your finances and achieve your money goals
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl flex items-start gap-3 animate-pulse">
            <div className="text-red-600 dark:text-red-400 text-xl mt-0.5">⚠️</div>
            <div>
              <p className="text-red-800 dark:text-red-300 text-sm font-medium">Login Failed</p>
              <p className="text-red-700 dark:text-red-400 text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-group">
              <Mail className="input-icon" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="form-input form-input-with-icon"
                required
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-group">
              <Lock className="input-icon" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="form-input form-input-with-icon pr-12"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full mt-8 py-3 text-base font-semibold group"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Logging in...
              </>
            ) : (
              <>
                Login
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="auth-divider">Don't have an account?</div>

        {/* Sign Up Link */}
        <Link
          to="/signup"
          className="w-full block text-center px-4 py-3 rounded-xl border-2 border-primary-600 text-primary-600 
                     hover:bg-primary-50 dark:hover:bg-primary-900/20 font-semibold transition-all duration-200"
        >
          Create Account
        </Link>

        {/* Demo Credentials */}
        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-2 uppercase tracking-wider">Demo Account</p>
          <div className="space-y-1 text-xs text-blue-700 dark:text-blue-300">
            <p>📧 Email: <span className="font-mono font-semibold">demo@example.com</span></p>
            <p>🔑 Password: <span className="font-mono font-semibold">password123</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
