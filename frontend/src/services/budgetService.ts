import api from './api';

export interface Budget {
  _id: string;
  userId: string;
  category: string;
  limit: number;
  month: string; // YYYY-MM format
  spent?: number;
  percentageSpent?: number;
  createdAt: string;
  updatedAt: string;
}

const budgetService = {
  getAll: async (): Promise<Budget[]> => {
    console.log('💰 budgetService.getAll called');
    const response = await api.get('/budget');
    console.log('✅ budgetService.getAll response:', response.data);
    // API returns array directly
    return Array.isArray(response.data) ? response.data : response.data.budgets || [];
  },

  create: async (payload: Omit<Budget, '_id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<Budget> => {
    const response = await api.post('/budget', payload);
    return response.data.budget || response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/budget/${id}`);
  }
};

export default budgetService;
