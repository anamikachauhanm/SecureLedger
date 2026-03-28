import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Bell, Clock } from 'lucide-react';
import reminderService, { Reminder } from '../services/reminderService';
import { formatCurrency, categories } from '../utils/helpers';
import { useAuth } from '../context/AuthContext';

const Reminders: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    dueDate: '',
    category: 'Bills',
    isActive: true,
  });

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      setLoading(true);
      const data = await reminderService.getAll();
      setReminders(data);
      setError('');
    } catch (err: any) {
      setError('Failed to load reminders');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReminder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.amount || !formData.dueDate) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const dueDay = parseInt(formData.dueDate);
      if (dueDay < 1 || dueDay > 31) {
        setError('Due date must be between 1 and 31');
        return;
      }

      await reminderService.create({
        title: formData.title,
        amount: parseFloat(formData.amount),
        dueDate: dueDay,
        category: formData.category,
        isActive: formData.isActive,
      } as any);

      setFormData({
        title: '',
        amount: '',
        dueDate: '',
        category: 'Bills',
        isActive: true,
      });
      setShowForm(false);
      await fetchReminders();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add reminder');
    }
  };

  const handleDeleteReminder = async (id: string) => {
    if (!confirm('Are you sure you want to delete this reminder?')) return;

    try {
      await reminderService.delete(id);
      await fetchReminders();
    } catch (err: any) {
      setError('Failed to delete reminder');
    }
  };

  // Sort reminders: due soon first, then active ones
  const sortedReminders = [...reminders]
    .filter((r) => r.isActive)
    .sort((a, b) => {
      const aDueSoon = a.isDueSoon ? 0 : 1;
      const bDueSoon = b.isDueSoon ? 0 : 1;
      if (aDueSoon !== bDueSoon) return aDueSoon - bDueSoon;
      return (a.daysUntilDue || 31) - (b.daysUntilDue || 31);
    });

  const inactiveReminders = reminders.filter((r) => !r.isActive);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="section-title">Bill Reminders</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2">
          <Plus size={18} />
          Add Reminder
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-300">
          {error}
        </div>
      )}

      {/* Add Reminder Form */}
      {showForm && (
        <div className="card border-2 border-primary-200 dark:border-primary-800">
          <h2 className="subsection-title">Add New Reminder</h2>
          <form onSubmit={handleAddReminder} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <div className="form-group">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Electricity Bill"
                  className="form-input"
                  required
                />
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

              {/* Due Date (Day of Month) */}
              <div className="form-group">
                <label className="form-label">Due Date (Day of Month)</label>
                <input
                  type="number"
                  min="1"
                  max="31"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  placeholder="1-31"
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
                >
                  <option value="Bills">Bills</option>
                  <option value="Subscription">Subscription</option>
                  <option value="Insurance">Insurance</option>
                  <option value="Loan">Loan</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Active */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4 rounded"
              />
              <label htmlFor="isActive" className="text-gray-700 dark:text-gray-300">
                Active
              </label>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button type="submit" className="btn-primary">
                Add Reminder
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

      {/* Reminders List */}
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
        </div>
      ) : (
        <>
          {/* Active Reminders */}
          {sortedReminders.length > 0 ? (
            <div className="space-y-4">
              <h2 className="subsection-title">Active Reminders</h2>
              {sortedReminders.map((reminder) => {
                const daysUntil = reminder.daysUntilDue || 0;
                const isDueSoon = reminder.isDueSoon ?? daysUntil <= 3;
                return (
                  <div
                    key={reminder._id}
                    className={`card border-l-4 ${isDueSoon ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-primary-500'}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Bell className={isDueSoon ? 'text-red-600' : 'text-primary-600'} size={20} />
                          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{reminder.title}</h3>
                          <span className="px-2 py-1 rounded text-xs font-semibold bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                            {reminder.category}
                          </span>
                        </div>

                        <div className="flex items-center flex-wrap gap-4">
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {formatCurrency(reminder.amount, user?.currency)}
                          </p>
                          <div className={`flex items-center gap-1 ${isDueSoon ? 'text-red-600' : 'text-primary-600'}`}>
                            <Clock size={18} />
                            <span className="font-semibold">
                              {daysUntil === 0
                                ? 'Due Today!'
                                : daysUntil === 1
                                ? 'Due Tomorrow'
                                : `Due in ${daysUntil} days`}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteReminder(reminder._id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="card text-center py-8">
              <Bell className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600 dark:text-gray-400">No active reminders. Create one to get started!</p>
            </div>
          )}

          {/* Inactive Reminders */}
          {inactiveReminders.length > 0 && (
            <div className="space-y-4 mt-8">
              <h2 className="subsection-title">Inactive Reminders ({inactiveReminders.length})</h2>
              <div className="space-y-2">
                {inactiveReminders.map((reminder) => (
                  <div key={reminder._id} className="card opacity-75">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-gray-600 dark:text-gray-400 line-through">{reminder.title}</span>
                        <span className="px-2 py-1 rounded text-xs font-semibold bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                          {reminder.category}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteReminder(reminder._id)}
                        className="text-red-600 hover:text-red-700 p-2 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Reminders;
