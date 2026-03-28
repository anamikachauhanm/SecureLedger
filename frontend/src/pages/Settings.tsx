import React, { useState } from 'react';
import { Settings, LogOut, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SettingsPage: React.FC = () => {
  const { user, updateTheme, logout } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleThemeToggle = async (theme: 'dark' | 'light') => {
    try {
      setError('');
      setSuccess('');
      await updateTheme(theme);
      setSuccess('Theme updated successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to update theme');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Settings size={32} className="text-primary-600" />
        <h1 className="section-title m-0">Settings</h1>
      </div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-300">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-300">
          {success}
        </div>
      )}

      {/* Profile Section */}
      <div className="card">
        <h2 className="subsection-title">Profile Information</h2>
        <div className="space-y-4">
          <div>
            <label className="form-label">Name</label>
            <input
              type="text"
              value={user?.name}
              disabled
              className="form-input opacity-50 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="form-label">Email</label>
            <input
              type="email"
              value={user?.email}
              disabled
              className="form-input opacity-50 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="form-label">Role</label>
            <input
              type="text"
              value={user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
              disabled
              className="form-input opacity-50 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="form-label">Currency</label>
            <input
              type="text"
              value={user?.currency}
              disabled
              className="form-input opacity-50 cursor-not-allowed"
            />
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 italic">
            Contact support to update your profile information
          </p>
        </div>
      </div>

      {/* Theme Section */}
      <div className="card">
        <h2 className="subsection-title">Appearance</h2>
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">Choose your preferred theme:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* Light Theme */}
            <button
              onClick={() => handleThemeToggle('light')}
              className={`p-4 rounded-lg border-2 transition-all ${
                user?.theme === 'light'
                  ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-primary-400'
              }`}
            >
              <Sun className="mx-auto mb-2 text-yellow-500" size={28} />
              <p className={`font-semibold ${user?.theme === 'light' ? 'text-primary-600' : 'text-gray-700 dark:text-gray-300'}`}>
                Light
              </p>
              {user?.theme === 'light' && <p className="text-xs text-primary-600 dark:text-primary-400">Active</p>}
            </button>

            {/* Dark Theme */}
            <button
              onClick={() => handleThemeToggle('dark')}
              className={`p-4 rounded-lg border-2 transition-all ${
                user?.theme === 'dark'
                  ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-primary-400'
              }`}
            >
              <Moon className="mx-auto mb-2 text-gray-700 dark:text-gray-300" size={28} />
              <p className={`font-semibold ${user?.theme === 'dark' ? 'text-primary-600' : 'text-gray-700 dark:text-gray-300'}`}>
                Dark
              </p>
              {user?.theme === 'dark' && <p className="text-xs text-primary-600 dark:text-primary-400">Active</p>}
            </button>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="card">
        <h2 className="subsection-title">Security</h2>
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">Manage your account security:</p>
          <button
            disabled
            className="btn-secondary opacity-50 cursor-not-allowed"
          >
            Change Password
          </button>
          <p className="text-xs text-gray-600 dark:text-gray-400 italic">
            Coming soon
          </p>
        </div>
      </div>

      {/* Logout Section */}
      <div className="card border-red-200 dark:border-red-800">
        <h2 className="subsection-title text-red-600 dark:text-red-400">Logout</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Click below to logout from your account
        </p>
        <button
          onClick={handleLogout}
          className="btn-danger flex items-center gap-2"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* About Section */}
      <div className="card bg-primary-50 dark:bg-primary-900/10 border-primary-200 dark:border-primary-800">
        <h2 className="subsection-title text-primary-700 dark:text-primary-400">About SecureLedger</h2>
        <div className="space-y-2 text-gray-700 dark:text-gray-300">
          <p>
            <strong>Version:</strong> 1.0.0
          </p>
          <p>
            <strong>Description:</strong> A secure personal finance management application
          </p>
          <p>
            <strong>Features:</strong> Transaction tracking, Budget management, Bill reminders, Financial analytics
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 pt-2">
            © 2026 SecureLedger. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
