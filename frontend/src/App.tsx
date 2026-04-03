import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budget from './pages/Budget';
import Reminders from './pages/Reminders';
import Settings from './pages/Settings';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  // Apply dark mode
  useEffect(() => {
    const htmlElement = document.documentElement;
    if (user?.theme === 'dark') {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }, [user?.theme]);

  // ✅ FIXED LAYOUT
  if (isAuthenticated) {
    return (
      <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    );
  }

  // Public pages (Landing, Login, Signup)
  return (
    <div className="min-h-screen w-full">
      {children}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppLayout>
          <Routes>
            {/* Landing */}
            <Route path="/" element={<Landing />} />

            {/* Public */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/transactions"
              element={
                <ProtectedRoute>
                  <Transactions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/budget"
              element={
                <ProtectedRoute>
                  <Budget />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reminders"
              element={
                <ProtectedRoute>
                  <Reminders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AppLayout>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
