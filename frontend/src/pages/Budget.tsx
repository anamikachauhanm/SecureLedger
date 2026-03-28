import React, { useEffect, useState } from 'react';
import { Plus, Trash2, AlertTriangle } from 'lucide-react';
import budgetService, { Budget } from '../services/budgetService';
import transactionService from '../services/transactionService';
import { formatCurrency, getCurrentMonth, getMonthName, categories } from '../utils/helpers';
import { useAuth } from '../context/AuthContext';

const BudgetPage: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const { user } = useAuth();

  // Form state
  const [formData, setFormData] = useState({
    category: '',
    limit: '',
  });

  useEffect(() => {
    fetchBudgets();
  }, [currentMonth]);

  const fetchBudgets = async () => {
    try {
      setLoading(true);
      const data = await budgetService.getAll();
      // Filter budgets for current month
      const monthBudgets = data.filter((b) => b.month === currentMonth);
      setBudgets(monthBudgets);
      setError('');
    } catch (err: any) {
      setError('Failed to load budgets');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBudget = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category || !formData.limit) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await budgetService.create({
        category: formData.category,
        limit: parseFloat(formData.limit),
        month: currentMonth,
      } as any);

      setFormData({
        category: '',
        limit: '',
      });
      setShowForm(false);
      await fetchBudgets();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add budget');
    }
  };

  const handleDeleteBudget = async (id: string) => {
    if (!confirm('Are you sure you want to delete this budget?')) return;

    try {
      await budgetService.delete(id);
      await fetchBudgets();
    } catch (err: any) {
      setError('Failed to delete budget');
    }
  };

  const handlePreviousMonth = () => {
    const [year, month] = currentMonth.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 2);
    setCurrentMonth(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`);
  };

  const handleNextMonth = () => {
    const [year, month] = currentMonth.split('-');
    const date = new Date(parseInt(year), parseInt(month));
    setCurrentMonth(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`);
  };

  const handleResetToCurrentMonth = () => {
    setCurrentMonth(getCurrentMonth());
  };

  // Get budgets sorted by percentage spent
  const sortedBudgets = [...budgets].sort((a, b) => (b.percentageSpent || 0) - (a.percentageSpent || 0));

  // Summary stats
  const totalBudgetLimit = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + (b.spent || 0), 0);
  const overBudgetCount = budgets.filter((b) => (b.percentageSpent || 0) > 100).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="section-title">Budget Management</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2">
          <Plus size={18} />
          Add Budget
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-300">
          {error}
        </div>
      )}

      {/* Month Selector */}
      <div className="card">
        <div className="flex items-center justify-between">
          <button onClick={handlePreviousMonth} className="btn-secondary">
            ← Previous
          </button>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Month</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{getMonthName(currentMonth)}</p>
          </div>
          <div className="flex gap-2">
            {currentMonth !== getCurrentMonth() && (
              <button onClick={handleResetToCurrentMonth} className="btn-secondary text-sm">
                Current Month
              </button>
            )}
            <button onClick={handleNextMonth} className="btn-secondary">
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Add Budget Form */}
      {showForm && (
        <div className="card border-2 border-primary-200 dark:border-primary-800">
          <h2 className="subsection-title">Add New Budget</h2>
          <form onSubmit={handleAddBudget} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Category */}
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="form-input"
                  required
                >
                  <option value="">Select category</option>
                  {categories.expense.map((cat) => (
                    <option key={cat} value={cat} disabled={budgets.some((b) => b.category === cat)}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Limit */}
              <div className="form-group">
                <label className="form-label">Monthly Limit</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.limit}
                  onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
                  placeholder="0.00"
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button type="submit" className="btn-primary">
                Add Budget
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Summary Stats */}
      {budgets.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card border-t-4 border-primary-500">
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Limit</p>
            <p className="text-2xl font-bold text-primary-600 mt-2">{formatCurrency(totalBudgetLimit, user?.currency)}</p>
          </div>
          <div className="card border-t-4 border-orange-500">
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Spent</p>
            <p className="text-2xl font-bold text-orange-600 mt-2">{formatCurrency(totalSpent, user?.currency)}</p>
          </div>
          <div className={`card border-t-4 ${overBudgetCount > 0 ? 'border-red-500' : 'border-green-500'}`}>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Over Budget</p>
            <p className={`text-2xl font-bold mt-2 ${overBudgetCount > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {overBudgetCount} categor{overBudgetCount !== 1 ? 'ies' : 'y'}
            </p>
          </div>
        </div>
      )}

      {/* Budgets List */}
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
        </div>
      ) : sortedBudgets.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {sortedBudgets.map((budget) => {
            const percentage = budget.percentageSpent || 0;
            const isOverBudget = percentage > 100;
            return (
              <div key={budget._id} className="card">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{budget.category}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formatCurrency(budget.spent || 0, user?.currency)} of {formatCurrency(budget.limit, user?.currency)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${isOverBudget ? 'text-red-600' : 'text-primary-600'}`}>
                        {percentage.toFixed(0)}%
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteBudget(budget._id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-3 rounded-full transition-all ${
                        isOverBudget ? 'bg-red-600' : percentage > 75 ? 'bg-orange-500' : 'bg-primary-600'
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Status */}
                {isOverBudget && (
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                    <AlertTriangle size={16} />
                    Over budget by {formatCurrency((budget.spent || 0) - budget.limit, user?.currency)}
                  </div>
                )}
                {percentage > 75 && !isOverBudget && (
                  <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 text-sm">
                    <AlertTriangle size={16} />
                    Approaching limit: {formatCurrency(budget.limit - (budget.spent || 0), user?.currency)} remaining
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">No budgets created for {getMonthName(currentMonth)}. Create one to get started!</p>
        </div>
      )}
    </div>
  );
};

export default BudgetPage;
