import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import transactionService, { Transaction } from '../services/transactionService';
import budgetService, { Budget } from '../services/budgetService';
import { formatCurrency, getCurrentMonth, getMonthName, getCategoryColor } from '../utils/helpers';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    console.log('📊 Dashboard mounted, user:', user);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      console.log('📊 Dashboard.fetchData() called');
      const currentMonth = getCurrentMonth();
      console.log('📅 Current month:', currentMonth);
      const [txns, bgt] = await Promise.all([
        transactionService.getAll({ month: currentMonth }),
        budgetService.getAll(),
      ]);
      console.log('✅ Dashboard data loaded:', { transactions: txns.length, budgets: bgt.length });
      setTransactions(txns);
      setBudgets(bgt);
      setError('');
    } catch (err: any) {
      console.error('❌ Dashboard data fetch error:', err);
      console.error('Error details:', err.response?.data || err.message);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Calculate totals
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  // Category breakdown
  const expenseByCategory = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      const existing = acc.find((item) => item.name === t.category);
      if (existing) {
        existing.value += t.amount;
      } else {
        acc.push({ name: t.category, value: t.amount });
      }
      return acc;
    }, [] as Array<{ name: string; value: number }>)
    .sort((a, b) => b.value - a.value);

  // Budget status
  const currentMonth = getCurrentMonth();
  const budgetsThisMonth = budgets
    .filter((b) => b.month === currentMonth)
    .sort((a, b) => (b.percentageSpent || 0) - (a.percentageSpent || 0));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 rounded-2xl p-8 border-2 border-cyan-200 dark:border-cyan-800/50">
        <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 dark:from-cyan-300 dark:via-blue-300 dark:to-indigo-300 bg-clip-text text-transparent">Welcome back, {user?.name}! 👋</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mt-3 font-semibold">{getMonthName(currentMonth)}</p>
      </div>

      {error && (
        <div className="p-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/40 dark:to-orange-950/40 border-2 border-red-300 dark:border-red-700/50 rounded-2xl text-red-800 dark:text-red-300 font-semibold">
          ⚠️ {error}
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Income Card */}
        <div className="group relative bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-900/30 dark:to-emerald-950/50 rounded-2xl p-8 border-2 border-emerald-300 dark:border-emerald-700/50 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all hover:-translate-y-2 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-emerald-400/0 group-hover:from-emerald-500/10 group-hover:to-emerald-400/10 transition-all"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-emerald-700 dark:text-emerald-300 text-sm font-bold uppercase tracking-wide">Income</p>
              <p className="text-4xl font-black text-emerald-600 dark:text-emerald-300 mt-3">{formatCurrency(income, user?.currency)}</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 rounded-2xl p-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all">
              <TrendingUp className="text-white" size={32} />
            </div>
          </div>
        </div>

        {/* Expense Card */}
        <div className="group relative bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-900/30 dark:to-red-950/50 rounded-2xl p-8 border-2 border-red-300 dark:border-red-700/50 hover:shadow-2xl hover:shadow-red-500/30 transition-all hover:-translate-y-2 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 to-red-400/0 group-hover:from-red-500/10 group-hover:to-red-400/10 transition-all"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-red-700 dark:text-red-300 text-sm font-bold uppercase tracking-wide">Expense</p>
              <p className="text-4xl font-black text-red-600 dark:text-red-300 mt-3">{formatCurrency(expense, user?.currency)}</p>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 rounded-2xl p-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all">
              <TrendingDown className="text-white" size={32} />
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <div className={`group relative bg-gradient-to-br ${balance >= 0 ? 'from-cyan-50 to-blue-100/50 dark:from-cyan-900/30 dark:to-blue-950/50' : 'from-orange-50 to-orange-100/50 dark:from-orange-900/30 dark:to-orange-950/50'} rounded-2xl p-8 border-2 ${balance >= 0 ? 'border-cyan-300 dark:border-cyan-700/50 hover:shadow-cyan-500/30' : 'border-orange-300 dark:border-orange-700/50 hover:shadow-orange-500/30'} hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden`}>
          <div className={`absolute inset-0 bg-gradient-to-r ${balance >= 0 ? 'from-cyan-500/0 to-blue-400/0 group-hover:from-cyan-500/10 group-hover:to-blue-400/10' : 'from-orange-500/0 to-orange-400/0 group-hover:from-orange-500/10 group-hover:to-orange-400/10'} transition-all`}></div>
          <div className="relative flex items-center justify-between">
            <div>
              <p className={`text-sm font-bold uppercase tracking-wide ${balance >= 0 ? 'text-cyan-700 dark:text-cyan-300' : 'text-orange-700 dark:text-orange-300'}`}>Balance</p>
              <p className={`text-4xl font-black mt-3 ${balance >= 0 ? 'text-cyan-600 dark:text-cyan-300' : 'text-orange-600 dark:text-orange-300'}`}>
                {formatCurrency(balance, user?.currency)}
              </p>
            </div>
            <div className={`${balance >= 0 ? 'bg-gradient-to-br from-cyan-500 to-blue-600 dark:from-cyan-600 dark:to-blue-700' : 'bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700'} rounded-2xl p-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all`}>
              <Wallet className="text-white" size={32} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Breakdown */}
        {expenseByCategory.length > 0 && (
          <div className="group relative bg-gradient-to-br from-white to-cyan-50/50 dark:from-gray-800 dark:to-cyan-950/30 rounded-2xl p-8 border-2 border-cyan-200 dark:border-cyan-800/50 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-300 dark:to-blue-300 bg-clip-text">Expense Breakdown</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${formatCurrency(value, user?.currency)}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expenseByCategory.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={getCategoryColor(entry.name)} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value as number, user?.currency)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Top Budgets */}
        <div className="group relative bg-gradient-to-br from-white to-purple-50/50 dark:from-gray-800 dark:to-purple-950/30 rounded-2xl p-8 border-2 border-purple-200 dark:border-purple-800/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <h2 className="text-2xl font-bold mb-6 text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-300 dark:to-pink-300 bg-clip-text">Budget Status</h2>
          {budgetsThisMonth.length > 0 ? (
            <div className="space-y-6">
              {budgetsThisMonth.slice(0, 5).map((budget) => {
                const percentage = budget.percentageSpent || 0;
                const isOverBudget = percentage > 100;
                return (
                  <div key={budget._id} className="group/budget">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-gray-800 dark:text-gray-200 text-lg">{budget.category}</span>
                      <span className={`text-sm font-bold px-3 py-1 rounded-lg ${isOverBudget ? 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300' : 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'}`}>
                        {percentage.toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden border border-gray-300 dark:border-gray-600">
                      <div
                        className={`h-3 rounded-full transition-all bg-gradient-to-r ${
                          isOverBudget ? 'from-red-500 to-red-600' : 'from-green-500 to-emerald-600'
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 font-medium">
                      {formatCurrency(budget.spent || 0, user?.currency)} / {formatCurrency(budget.limit, user?.currency)}
                    </p>
                  </div>
                );
              })}
              {budgetsThisMonth.length === 0 && (
                <p className="text-gray-600 dark:text-gray-400 text-center py-4">No budgets set for this month</p>
              )}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400 text-center py-4">No budgets created yet</p>
          )}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <h2 className="subsection-title">Recent Transactions</h2>
        {transactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-semibold">Category</th>
                  <th className="text-left py-3 px-4 font-semibold">Note</th>
                  <th className="text-right py-3 px-4 font-semibold">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold">Type</th>
                </tr>
              </thead>
              <tbody>
                {transactions.slice(0, 5).map((txn) => (
                  <tr key={txn._id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="py-3 px-4 font-medium">{txn.category}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{txn.note}</td>
                    <td className={`py-3 px-4 text-right font-semibold ${txn.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      {txn.type === 'income' ? '+' : '-'}{formatCurrency(txn.amount, user?.currency)}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${txn.type === 'income' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
                        {txn.type.charAt(0).toUpperCase() + txn.type.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 text-center py-8">No transactions yet. Start adding some!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
