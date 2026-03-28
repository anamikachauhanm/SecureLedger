import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  TrendingUp, Wallet, Target, Bell, BarChart3, Lock, Eye,
  ChevronRight, ArrowRight, Menu, X, Moon, Sun
} from 'lucide-react';

const Landing: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const features = [
    {
      icon: TrendingUp,
      title: 'Smart Analytics',
      description: 'Track your income and expenses with beautiful charts and detailed insights into your spending patterns.',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: Target,
      title: 'Budget Planning',
      description: 'Set monthly budgets by category and receive alerts when you\'re approaching your limits.',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: Bell,
      title: 'Bill Reminders',
      description: 'Never miss a payment with automated reminders for recurring bills and important due dates.',
      color: 'from-orange-400 to-orange-600'
    },
    {
      icon: Lock,
      title: 'Secure & Private',
      description: 'Your financial data is encrypted and stored securely with bank-level security protocols.',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: BarChart3,
      title: 'Financial Reports',
      description: 'Export detailed transaction reports in CSV format for tax and financial planning.',
      color: 'from-pink-400 to-pink-600'
    },
    {
      icon: Wallet,
      title: 'Multi-Currency',
      description: 'Support for multiple currencies to manage your finances across different countries.',
      color: 'from-indigo-400 to-indigo-600'
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Create Account',
      description: 'Sign up in seconds with your email and set up your financial profile.',
    },
    {
      number: '02',
      title: 'Add Transactions',
      description: 'Log your income and expenses with notes and categories for better organization.',
    },
    {
      number: '03',
      title: 'Set Budgets',
      description: 'Create monthly budgets by category and track your spending in real-time.',
    },
    {
      number: '04',
      title: 'Achieve Goals',
      description: 'Monitor progress and get insights to make better financial decisions.',
    },
  ];

  return (
    <div className={isDark ? 'dark' : ''}>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(6, 182, 212, 0.4), 0 0 40px rgba(6, 182, 212, 0.2); }
          50% { box-shadow: 0 0 40px rgba(6, 182, 212, 0.8), 0 0 80px rgba(6, 182, 212, 0.4); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes bounce-right {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-glow-pulse {
          animation: glow-pulse 3s ease-in-out infinite;
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
          background-size: 1000px 100%;
        }
        .animate-bounce-right {
          animation: bounce-right 2s ease-in-out infinite;
        }
        .bg-grid {
          background-image: 
            linear-gradient(90deg, rgba(6, 182, 212, 0.15) 2px, transparent 2px),
            linear-gradient(rgba(6, 182, 212, 0.15) 2px, transparent 2px);
          background-size: 50px 50px;
        }
        .dark .bg-grid {
          background-image: 
            linear-gradient(90deg, rgba(34, 197, 94, 0.2) 2px, transparent 2px),
            linear-gradient(rgba(34, 197, 94, 0.2) 2px, transparent 2px);
        }
        .gradient-border {
          position: relative;
          border: 2px solid transparent;
          background: linear-gradient(white, white) padding-box, linear-gradient(135deg, #0284c7, #06b6d4) border-box;
        }
        .dark .gradient-border {
          background: linear-gradient(#1f2937, #1f2937) padding-box, linear-gradient(135deg, #22c55e, #06b6d4) border-box;
        }
      `}</style>
      <div className="min-h-screen bg-gradient-to-br from-white via-cyan-50 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-950 text-gray-900 dark:text-white transition-colors duration-300 relative overflow-hidden">
        {/* Background Grid Pattern - Much More Visible */}
        <div className="absolute inset-0 bg-grid opacity-100 dark:opacity-60"></div>
        
        {/* Large Animated Gradient Orbs - Much More Visible & Vibrant */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-300 via-blue-300 to-indigo-300 dark:from-green-500/40 dark:via-cyan-500/40 dark:to-blue-500/40 rounded-full blur-2xl opacity-70 dark:opacity-50 animate-float -z-10 filter drop-shadow-2xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-pink-300 via-purple-300 to-cyan-300 dark:from-pink-500/40 dark:via-purple-500/40 dark:to-cyan-500/40 rounded-full blur-2xl opacity-60 dark:opacity-45 animate-pulse-slow -z-10 filter drop-shadow-2xl"></div>
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-gradient-to-br from-yellow-200 via-orange-300 to-pink-300 dark:from-yellow-500/35 dark:via-orange-500/35 dark:to-pink-500/35 rounded-full blur-2xl opacity-50 dark:opacity-40 animate-float -z-10 filter drop-shadow-2xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-br from-blue-300 via-teal-300 to-green-300 dark:from-blue-500/35 dark:via-teal-500/35 dark:to-green-500/35 rounded-full blur-3xl opacity-55 dark:opacity-40 animate-pulse-slow -z-10 filter drop-shadow-2xl" style={{animationDelay: '1s'}}></div>
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                  📊
                </div>
                <span className="font-bold text-xl hidden sm:inline">SecureLedger</span>
              </Link>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-8">
                <a href="#features" className="hover:text-primary-600 transition-colors">Features</a>
                <a href="#how-it-works" className="hover:text-primary-600 transition-colors">How It Works</a>
                <a href="#benefits" className="hover:text-primary-600 transition-colors">Benefits</a>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <Link
                  to="/login"
                  className="hidden sm:inline px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                >
                  Login
                </Link>

                {/* Mobile menu button */}
                <button
                  className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800">
              <div className="px-4 py-4 space-y-4">
                <a href="#features" className="block hover:text-primary-600">Features</a>
                <a href="#how-it-works" className="block hover:text-primary-600">How It Works</a>
                <a href="#benefits" className="block hover:text-primary-600">Benefits</a>
                <Link to="/login" className="block w-full px-4 py-2 rounded-lg bg-primary-600 text-white text-center">
                  Login
                </Link>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 relative overflow-hidden">
          {/* Animated Accent Lines */}
          <div className="absolute top-10 left-5 w-32 h-32 border border-primary-200 dark:border-primary-800/30 rounded-3xl opacity-40 dark:opacity-20 animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-5 w-24 h-24 border-2 border-blue-200 dark:border-blue-800/30 rounded-full opacity-30 dark:opacity-15"></div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-block mb-6 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 rounded-full blur-lg opacity-80 group-hover:opacity-100 transition-opacity animate-glow-pulse"></div>
              <span className="inline-block relative px-6 py-3 bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-green-900 dark:to-blue-900 text-cyan-700 dark:text-green-300 rounded-full text-sm font-bold border-2 border-cyan-300 dark:border-green-600 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all">
                ✨ Personal Finance Made Simple
              </span>
            </div>

            <h1 className="text-6xl sm:text-7xl font-black mb-6 leading-tight bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 dark:from-cyan-300 dark:via-green-300 dark:to-blue-300 bg-clip-text text-transparent drop-shadow-lg">
              Take Control of Your <span className="block">Finances</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              SecureLedger is your all-in-one personal finance manager. Track expenses, set budgets, plan goals, and achieve financial freedom with confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <button
                onClick={() => navigate('/signup')}
                className="group relative px-12 py-6 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:scale-105 active:scale-95 border-2 border-blue-400 dark:border-blue-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                <div className="relative flex items-center justify-center gap-2">
                  Get Started Free
                  <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </button>
              <Link
                to="/login"
                className="group relative px-12 py-6 border-3 border-cyan-500 dark:border-cyan-400 rounded-2xl font-bold text-lg bg-white dark:bg-gray-900 hover:bg-cyan-50 dark:hover:bg-cyan-950/50 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center text-gray-900 dark:text-white shadow-lg hover:shadow-xl hover:shadow-cyan-500/40"
              >
                Sign In
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 sm:gap-8 py-16 bg-gradient-to-r from-white/90 to-gray-50/90 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700/50 rounded-3xl mt-12 shadow-xl">
              <div className="flex flex-col items-center p-6 group">
                <div className="text-5xl sm:text-6xl font-black text-transparent bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text mb-3 group-hover:scale-110 transition-transform">100%</div>
                <p className="font-bold text-gray-800 dark:text-gray-200 text-center">Secure</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 text-center">Bank-level encryption</p>
              </div>
              <div className="flex flex-col items-center p-6 group border-l-2 border-r-2 border-gray-200 dark:border-gray-700/50">
                <div className="text-5xl sm:text-6xl font-black text-transparent bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text mb-3 group-hover:scale-110 transition-transform">24/7</div>
                <p className="font-bold text-gray-800 dark:text-gray-200 text-center">Available</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 text-center">Round-the-clock access</p>
              </div>
              <div className="flex flex-col items-center p-6 group">
                <div className="text-5xl sm:text-6xl font-black text-transparent bg-gradient-to-r from-yellow-500 to-orange-600 dark:from-yellow-400 dark:to-orange-400 bg-clip-text mb-3 group-hover:scale-110 transition-transform">Free</div>
                <p className="font-bold text-gray-800 dark:text-gray-200 text-center">Forever</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 text-center">No hidden charges</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 px-4 bg-gradient-to-b from-gray-50 via-cyan-50 to-gray-50 dark:from-gray-800/50 dark:via-cyan-950/30 dark:to-gray-800/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl sm:text-6xl font-black mb-6 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 dark:from-cyan-300 dark:via-blue-300 dark:to-indigo-300 bg-clip-text text-transparent">Powerful Features</h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full mx-auto mb-8"></div>
              <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Everything you need to manage your personal finances effectively and securely
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="group relative bg-white dark:bg-gray-800 rounded-3xl p-10 hover:shadow-2xl transition-all duration-300 hover:-translate-y-4 border-3 border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    {/* Animated gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/50 dark:to-blue-950/50 opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
                    
                    {/* Bright top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Glowing background blob */}
                    <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-cyan-300 to-blue-300 dark:from-cyan-500/30 dark:to-blue-500/30 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                    
                    <div className={`relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-8 shadow-xl group-hover:shadow-2xl group-hover:scale-125 transition-all duration-300 group-hover:animate-glow-pulse`}>
                      <Icon className="text-white" size={40} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-blue-600 group-hover:bg-clip-text transition-all">{feature.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24 px-4 bg-gradient-to-b from-white via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl sm:text-6xl font-black mb-6 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 dark:from-cyan-300 dark:via-blue-300 dark:to-indigo-300 bg-clip-text text-transparent">How It Works</h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full mx-auto mb-8"></div>
              <p className="text-xl text-gray-700 dark:text-gray-300">
                Get started in just 4 simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-lg transition-all duration-300"></div>
                  <div className="relative bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700 dark:from-cyan-700 dark:via-blue-700 dark:to-indigo-800 text-white rounded-2xl p-8 h-full hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 group-hover:-translate-y-4 border-2 border-cyan-400/30 overflow-hidden">
                    {/* Animated glow background */}
                    <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl -mr-20 -mt-20"></div>
                    </div>
                    
                    <div className="relative z-10">
                      <div className="text-6xl font-black mb-4 opacity-50 group-hover:opacity-80 transition-opacity text-cyan-100">{step.number}</div>
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-100 transition-colors">{step.title}</h3>
                      <p className="text-cyan-50 text-lg leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                  
                  {/* Connector line for desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-8 w-8 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-transparent group-hover:from-indigo-500 transition-all"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-24 px-4 bg-gradient-to-b from-gray-50 via-cyan-50 to-gray-50 dark:from-gray-800/50 dark:via-cyan-950/30 dark:to-gray-800/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl sm:text-6xl font-black mb-6 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 dark:from-cyan-300 dark:via-blue-300 dark:to-indigo-300 bg-clip-text text-transparent">Why Choose SecureLedger?</h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-4">
                  {[
                    { icon: '🔒', title: 'Bank-Level Security', desc: 'Your data is encrypted and protected' },
                    { icon: '📱', title: 'Responsive Design', desc: 'Works seamlessly on all devices' },
                    { icon: '⚡', title: 'Lightning Fast', desc: 'Real-time updates and instant syncing' },
                    { icon: '🎨', title: 'Beautiful UI', desc: 'Modern, intuitive interface' },
                    { icon: '🌙', title: 'Dark Mode', desc: 'Easy on the eyes, day or night' },
                    { icon: '💯', title: '100% Free', desc: 'No hidden charges ever' },
                  ].map((benefit, index) => (
                    <div key={index} className="group relative flex gap-4 p-5 rounded-xl bg-gradient-to-r from-white to-gray-50 dark:from-gray-800/50 dark:to-gray-900/50 hover:from-cyan-50 hover:to-blue-50 dark:hover:from-cyan-950/30 dark:hover:to-blue-950/30 transition-all border-2 border-gray-200 dark:border-gray-700 hover:border-cyan-400 dark:hover:border-cyan-600 shadow-md hover:shadow-lg">
                      <div className="text-4xl group-hover:scale-125 group-hover:animate-bounce transition-transform">{benefit.icon}</div>
                      <div>
                        <h4 className="font-bold text-lg text-gray-900 dark:text-white">{benefit.title}</h4>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">{benefit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-blue-600/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all group-hover:opacity-100"></div>
                <div className="relative bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700 dark:from-cyan-700 dark:via-blue-700 dark:to-indigo-800 rounded-3xl p-10 text-white shadow-2xl hover:shadow-3xl hover:shadow-blue-500/50 transition-all group-hover:-translate-y-2 border-2 border-cyan-400/30 overflow-hidden">
                  {/* Glassmorphism inner glow */}
                  <div className="absolute inset-0 bg-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"></div>
                  
                  <div className="relative space-y-8">
                    <div className="group/stat">
                      <div className="text-6xl font-black mb-2 group-hover/stat:text-cyan-100 transition-colors">₹50,000+</div>
                      <p className="text-cyan-100 text-lg font-semibold">Transactions tracked</p>
                    </div>
                    <div className="h-1 bg-gradient-to-r from-cyan-400/50 via-blue-400/50 to-transparent group-hover:from-cyan-300 group-hover:via-blue-300 transition-all"></div>
                    <div className="group/stat">
                      <div className="text-6xl font-black mb-2 group-hover/stat:text-cyan-100 transition-colors">24/7</div>
                      <p className="text-cyan-100 text-lg font-semibold">Real-time access</p>
                    </div>
                    <div className="h-1 bg-gradient-to-r from-cyan-400/50 via-blue-400/50 to-transparent group-hover:from-cyan-300 group-hover:via-blue-300 transition-all"></div>
                    <div className="group/stat">
                      <div className="text-6xl font-black mb-2 group-hover/stat:text-cyan-100 transition-colors">0%</div>
                      <p className="text-cyan-100 text-lg font-semibold">Commission fees</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-indigo-500/20 rounded-3xl blur-3xl"></div>
          
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h2 className="text-5xl sm:text-6xl font-black mb-6 bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-300 dark:to-blue-300 bg-clip-text text-transparent">Ready to Take Control?</h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-10 leading-relaxed">
              Start managing your finances smarter today. Join thousands of users who trust SecureLedger.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <button
                onClick={() => navigate('/signup')}
                className="group relative px-14 py-7 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white rounded-3xl font-bold text-lg overflow-hidden shadow-2xl hover:shadow-3xl hover:shadow-blue-500/70 transition-all transform hover:scale-105 active:scale-95 border-3 border-blue-400 dark:border-blue-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>
                <div className="relative flex items-center justify-center gap-2">
                  Create Free Account
                  <ArrowRight size={26} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </button>
              <a
                href="#features"
                className="group relative px-14 py-7 border-3 border-cyan-500 dark:border-cyan-400 rounded-3xl font-bold text-lg bg-white dark:bg-gray-900 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center text-gray-900 dark:text-white shadow-xl hover:shadow-2xl hover:shadow-cyan-500/50"
              >
                Learn More
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gradient-to-b from-gray-900 via-gray-950 to-black dark:from-gray-950 dark:via-gray-1000 dark:to-black text-white py-16 px-4 border-t-2 border-cyan-600/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all group-hover:scale-110">
                    📊
                  </div>
                  <span className="font-bold text-xl group-hover:text-cyan-300 transition-colors">SecureLedger</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">Your trusted personal finance manager with bank-level security</p>
              </div>
              <div>
                <h4 className="font-bold mb-4 text-cyan-300 text-lg">Product</h4>
                <ul className="text-gray-400 text-sm space-y-3">
                  <li><a href="#features" className="hover:text-cyan-400 transition-colors duration-200 flex items-center gap-2"><span className="group-hover:translate-x-1 transition-transform">→</span> Features</a></li>
                  <li><a href="#how-it-works" className="hover:text-cyan-400 transition-colors duration-200 flex items-center gap-2"><span className="group-hover:translate-x-1 transition-transform">→</span> How It Works</a></li>
                  <li><a href="#benefits" className="hover:text-cyan-400 transition-colors duration-200 flex items-center gap-2"><span className="group-hover:translate-x-1 transition-transform">→</span> Benefits</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4 text-cyan-300 text-lg">Account</h4>
                <ul className="text-gray-400 text-sm space-y-3">
                  <li><Link to="/login" className="hover:text-cyan-400 transition-colors duration-200 flex items-center gap-2"><span className="group-hover:translate-x-1 transition-transform">→</span> Login</Link></li>
                  <li><Link to="/signup" className="hover:text-cyan-400 transition-colors duration-200 flex items-center gap-2"><span className="group-hover:translate-x-1 transition-transform">→</span> Sign Up</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4 text-cyan-300 text-lg">Support</h4>
                <ul className="text-gray-400 text-sm space-y-3">
                  <li><a href="#" className="hover:text-cyan-400 transition-colors duration-200 flex items-center gap-2"><span className="group-hover:translate-x-1 transition-transform">→</span> Help Center</a></li>
                  <li><a href="#" className="hover:text-cyan-400 transition-colors duration-200 flex items-center gap-2"><span className="group-hover:translate-x-1 transition-transform">→</span> Contact</a></li>
                  <li><a href="#" className="hover:text-cyan-400 transition-colors duration-200 flex items-center gap-2"><span className="group-hover:translate-x-1 transition-transform">→</span> Privacy</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800/50 pt-8 text-center">
              <p className="text-gray-500 text-sm mb-4">&copy; 2026 SecureLedger. All rights reserved. Made with ❤️ for your financial freedom.</p>
              <div className="flex justify-center gap-4">
                <div className="w-1 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
                <p className="text-xs text-gray-600">Secure • Fast • Beautiful</p>
                <div className="w-1 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
