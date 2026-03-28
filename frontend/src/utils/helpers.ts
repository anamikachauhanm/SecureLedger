export const formatCurrency = (amount: number, currency: string = 'INR'): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const getCurrentMonth = (): string => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
};

export const getMonthName = (monthStr: string): string => {
  const [year, month] = monthStr.split('-');
  const date = new Date(`${year}-${month}-01`);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
  });
};

export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'Food': '#FF6B6B',
    'Transport': '#4ECDC4',
    'Entertainment': '#FFE66D',
    'Utilities': '#95E1D3',
    'Shopping': '#F38181',
    'Health': '#AA96DA',
    'Education': '#FCBAD3',
    'Salary': '#52B788',
    'Freelance': '#2D6A4F',
    'Investment': '#1B4965',
    'Bills': '#FF8B94',
    'Insurance': '#7F2982',
    'Other': '#A0A0A0',
  };
  return colors[category] || '#808080';
};

export const downloadFile = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const categories = {
  expense: ['Food', 'Transport', 'Entertainment', 'Utilities', 'Shopping', 'Health', 'Education', 'Bills', 'Insurance', 'Other'],
  income: ['Salary', 'Freelance', 'Investment', 'Other'],
};
