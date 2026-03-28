import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await signup(name, email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const passwordChecks = {
    length: password.length >= 6,
    hasUpperCase: /[A-Z]/.test(password),
    hasNumber: /\d/.test(password),
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

        {/* Signup Heading */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Create Account</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Start managing your finances securely today
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl flex items-start gap-3 animate-pulse">
            <div className="text-red-600 dark:text-red-400 text-xl mt-0.5">⚠️</div>
            <div>
              <p className="text-red-800 dark:text-red-300 text-sm font-medium">Signup Error</p>
              <p className="text-red-700 dark:text-red-400 text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name Field */}
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div className="input-group">
              <User className="input-icon" size={20} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="form-input form-input-with-icon"
                required
                autoComplete="name"
              />
            </div>
          </div>

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
                autoComplete="new-password"
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

          {/* Confirm Password Field */}
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <div className="input-group">
              <Lock className="input-icon" size={20} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="form-input form-input-with-icon pr-12"
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Password Strength Indicator */}
          {password && (
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Password Strength:</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  {passwordChecks.length ? (
                    <Check size={16} className="text-green-600" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600"></div>
                  )}
                  <span className={passwordChecks.length ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-400'}>
                    At least 6 characters
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  {passwordChecks.hasNumber ? (
                    <Check size={16} className="text-green-600" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600"></div>
                  )}
                  <span className={passwordChecks.hasNumber ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-400'}>
                    Contains a number
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full mt-8 py-3 text-base font-semibold group"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating Account...
              </>
            ) : (
              <>
                Sign Up
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="auth-divider">Already have an account?</div>

        {/* Login Link */}
        <Link
          to="/login"
          className="w-full block text-center px-4 py-3 rounded-xl border-2 border-primary-600 text-primary-600 
                     hover:bg-primary-50 dark:hover:bg-primary-900/20 font-semibold transition-all duration-200"
        >
          Login
        </Link>

        {/* Terms */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Signup;
