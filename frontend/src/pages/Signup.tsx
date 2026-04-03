import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Check, X } from 'lucide-react';
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

  const passwordChecks = {
    length: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[!@#$%^&*]/.test(password),
  };

  const allChecksPassed = Object.values(passwordChecks).every(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!allChecksPassed) {
      setError('Password does not meet all requirements');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await signup(name, email, password, confirmPassword);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 px-4">

      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">📊</div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              My Financial Advisor
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Personal Finance Manager
            </p>
          </div>
        </div>

        {/* Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            Create Account
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Start managing your finances securely today
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            required
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            required
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Password checklist */}
          {password && (
            <div className="text-xs space-y-1">
              <p className={passwordChecks.length ? 'text-green-500' : ''}>• 8+ characters</p>
              <p className={passwordChecks.hasUpperCase ? 'text-green-500' : ''}>• Uppercase</p>
              <p className={passwordChecks.hasLowerCase ? 'text-green-500' : ''}>• Lowercase</p>
              <p className={passwordChecks.hasNumber ? 'text-green-500' : ''}>• Number</p>
              <p className={passwordChecks.hasSpecial ? 'text-green-500' : ''}>• Special char</p>
            </div>
          )}

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
          >
            {loading ? 'Creating...' : 'Sign Up'}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        {/* Login link */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;