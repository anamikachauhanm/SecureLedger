import api from './api';

export interface Reminder {
  _id: string;
  userId: string;
  title: string;
  amount: number;
  dueDate: number; // 1-31
  category: string;
  isActive: boolean;
  daysUntilDue?: number;
  isDueSoon?: boolean;
  createdAt: string;
  updatedAt: string;
}

const reminderService = {
  getAll: async (): Promise<Reminder[]> => {
    const response = await api.get('/reminders');
    // Handle both array and wrapped response formats
    return Array.isArray(response.data) ? response.data : response.data.reminders || [];
  },

  create: async (payload: Omit<Reminder, '_id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<Reminder> => {
    const response = await api.post('/reminders', payload);
    return response.data.reminder || response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/reminders/${id}`);
  }
};

export default reminderService;
