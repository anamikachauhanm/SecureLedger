import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, Settings, Moon, Sun } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, updateTheme } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleTheme = () => {
    const newTheme = user?.theme === 'dark' ? 'light' : 'dark';
    console.log('🔄 Toggling theme from', user?.theme, 'to', newTheme);
    updateTheme(newTheme).catch((err) => console.error('❌ Theme toggle error:', err));
  };

  const NavLink: React.FC<{ to: string; label: string }> = ({ to, label }) => (
    <Link
      to={to}
      className={`px-4 py-2 rounded-lg transition-colors ${
        location.pathname === to
          ? 'bg-primary-600 text-white'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
      onClick={() => setIsOpen(false)}
    >
      {label}
    </Link>
  );

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
              📊
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">SecureLedger</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink to="/dashboard" label="Dashboard" />
            <NavLink to="/transactions" label="Transactions" />
            <NavLink to="/budget" label="Budget" />
            <NavLink to="/reminders" label="Reminders" />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Toggle theme"
            >
              {user?.theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link
              to="/settings"
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hidden sm:block"
              title="Settings"
            >
              <Settings size={20} />
            </Link>

            <button
              onClick={handleLogout}
              className="p-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors hidden sm:block"
              title="Logout"
            >
              <LogOut size={20} />
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <NavLink to="/dashboard" label="Dashboard" />
            <NavLink to="/transactions" label="Transactions" />
            <NavLink to="/budget" label="Budget" />
            <NavLink to="/reminders" label="Reminders" />
            <NavLink to="/settings" label="Settings" />
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
