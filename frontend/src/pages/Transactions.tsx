import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Download } from 'lucide-react';
import transactionService, { Transaction } from '../services/transactionService';
import { formatCurrency, formatDate, getCurrentMonth, categories, downloadFile } from '../utils/helpers';
import { useAuth } from '../context/AuthContext';

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    month: getCurrentMonth(),
  });
  const { user } = useAuth();

  // Form state
  const [formData, setFormData] = useState({
    type: 'expense' as 'income' | 'expense',
    amount: '',
    category: '',
    note: '',
    date: new Date().toISOString().split('T')[0],
    isRecurring: false,
    recurringFrequency: 'monthly' as 'daily' | 'weekly' | 'monthly' | 'yearly',
  });

  useEffect(() => {
    fetchTransactions();
  }, [filters]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const data = await transactionService.getAll({
        type: filters.type ? (filters.type as 'income' | 'expense') : undefined,
        category: filters.category || undefined,
        month: filters.month,
      });
      setTransactions(data);
      setError('');
    } catch (err: any) {
      setError('Failed to load transactions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category || !formData.amount) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await transactionService.create({
        type: formData.type,
        amount: parseFloat(formData.amount),
        category: formData.category,
        note: formData.note,
        date: formData.date,
        isRecurring: formData.isRecurring,
        recurringFrequency: formData.isRecurring ? formData.recurringFrequency : undefined,
      } as any);

      setFormData({
        type: 'expense',
        amount: '',
        category: '',
        note: '',
        date: new Date().toISOString().split('T')[0],
        isRecurring: false,
        recurringFrequency: 'monthly',
      });
      setShowForm(false);
      await fetchTransactions();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add transaction');
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    if (!confirm('Are you sure you want to delete this transaction?')) return;

    try {
      await transactionService.delete(id);
      await fetchTransactions();
    } catch (err: any) {
      setError('Failed to delete transaction');
    }
  };

  const handleExportCSV = async () => {
    try {
      setExporting(true);
      const blob = await transactionService.exportCSV();
      downloadFile(blob, `transactions-${filters.month}.csv`);
    } catch (err: any) {
      setError('Failed to export transactions');
    } finally {
      setExporting(false);
    }
  };

  const currentCategoryOptions = formData.type === 'income' ? categories.income : categories.expense;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="section-title">Transactions</h1>
        <div className="flex gap-3">
          <button
            onClick={handleExportCSV}
            disabled={exporting || transactions.length === 0}
            className="btn-secondary flex items-center gap-2"
          >
            <Download size={18} />
            {exporting ? 'Exporting...' : 'Export CSV'}
          </button>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2">
            <Plus size={18} />
            Add Transaction
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-300">
          {error}
        </div>
      )}

      {/* Add Transaction Form */}
      {showForm && (
        <div className="card border-2 border-primary-200 dark:border-primary-800">
          <h2 className="subsection-title">Add New Transaction</h2>
          <form onSubmit={handleAddTransaction} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Type */}
              <div className="form-group">
                <label className="form-label">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      type: e.target.value as 'income' | 'expense',
                      category: '',
                    });
                  }}
                  className="form-input"
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>

              {/* Amount */}
              <div className="form-group">
                <label className="form-label">Amount</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="0.00"
                  className="form-input"
                  required
                />
              </div>

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
                  {currentCategoryOptions.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div className="form-group">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Note */}
            <div className="form-group">
              <label className="form-label">Note</label>
              <input
                type="text"
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                placeholder="Add a note..."
                className="form-input"
              />
            </div>

            {/* Recurring */}
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isRecurring}
                  onChange={(e) => setFormData({ ...formData, isRecurring: e.target.checked })}
                  className="w-4 h-4 rounded"
                />
                <span className="text-gray-700 dark:text-gray-300">Recurring Transaction</span>
              </label>

              {formData.isRecurring && (
                <select
                  value={formData.recurringFrequency}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      recurringFrequency: e.target.value as 'daily' | 'weekly' | 'monthly' | 'yearly',
                    })
                  }
                  className="form-input w-32"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button type="submit" className="btn-primary">
                Add Transaction
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

      {/* Filters */}
      <div className="card">
        <h3 className="font-semibold mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="form-group">
            <label className="form-label">Type</label>
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="form-input"
            >
              <option value="">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="form-input"
            >
              <option value="">All Categories</option>
              {[...categories.income, ...categories.expense].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Month</label>
            <input
              type="month"
              value={filters.month}
              onChange={(e) => setFilters({ ...filters, month: e.target.value })}
              className="form-input"
            />
          </div>
        </div>
      </div>

      {/* Transactions List */}
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
        </div>
      ) : transactions.length > 0 ? (
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-semibold">Date</th>
                <th className="text-left py-3 px-4 font-semibold">Category</th>
                <th className="text-left py-3 px-4 font-semibold">Note</th>
                <th className="text-right py-3 px-4 font-semibold">Amount</th>
                <th className="text-center py-3 px-4 font-semibold">Type</th>
                <th className="text-center py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn._id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="py-3 px-4">{formatDate(txn.date)}</td>
                  <td className="py-3 px-4 font-medium">{txn.category}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{txn.note}</td>
                  <td className={`py-3 px-4 text-right font-semibold ${txn.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {txn.type === 'income' ? '+' : '-'}{formatCurrency(txn.amount, user?.currency)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${txn.type === 'income' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
                      {txn.type.charAt(0).toUpperCase() + txn.type.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleDeleteTransaction(txn._id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">No transactions found. Start adding some!</p>
        </div>
      )}
    </div>
  );
};

export default Transactions;
