import api from './api';

export interface Transaction {
  _id: string;
  userId: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  note: string;
  date: string;
  isRecurring: boolean;
  recurringFrequency?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  createdAt: string;
  updatedAt: string;
}

export interface MonthlySummary {
  month: string;
  income: number;
  expense: number;
  balance: number;
}

export interface TransactionFilters {
  type?: 'income' | 'expense';
  category?: string;
  month?: string; // YYYY-MM format
}

const transactionService = {
  getAll: async (filters?: TransactionFilters): Promise<Transaction[]> => {
    console.log('💳 transactionService.getAll called with filters:', filters);
    const response = await api.get('/transactions', { params: filters });
    console.log('✅ transactionService.getAll response:', response.data);
    // API returns array directly, not wrapped in { transactions: ... }
    return Array.isArray(response.data) ? response.data : response.data.transactions || [];
  },

  getById: async (id: string): Promise<Transaction> => {
    console.log('💳 transactionService.getById called with id:', id);
    const response = await api.get(`/transactions/${id}`);
    console.log('✅ transactionService.getById response:', response.data);
    return response.data;
  },

  create: async (payload: Omit<Transaction, '_id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<Transaction> => {
    const response = await api.post('/transactions', payload);
    return response.data.transaction || response.data;
  },

  update: async (id: string, payload: Partial<Transaction>): Promise<Transaction> => {
    const response = await api.put(`/transactions/${id}`, payload);
    return response.data.transaction || response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/transactions/${id}`);
  },

  getMonthlySummary: async (): Promise<MonthlySummary[]> => {
    const response = await api.get('/transactions/summary/monthly');
    return Array.isArray(response.data) ? response.data : response.data.summaries || [];
  },

  exportCSV: async (): Promise<Blob> => {
    const response = await api.get('/transactions/export/csv', {
      responseType: 'blob'
    });
    return response.data;
  }
};

export default transactionService;
