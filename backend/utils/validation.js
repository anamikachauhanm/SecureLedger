const validator = require('validator');

// Validate email format
const validateEmail = (email) => {
  if (!email || !validator.isEmail(email)) {
    throw new Error('Invalid email format');
  }
  return true;
};

// Validate password strength (FIX #7)
const validatePassword = (password) => {
  if (!password) {
    throw new Error('Password is required');
  }
  
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    throw new Error('Password must contain at least one uppercase letter (A-Z)');
  }
  
  if (!/[a-z]/.test(password)) {
    throw new Error('Password must contain at least one lowercase letter (a-z)');
  }
  
  if (!/[0-9]/.test(password)) {
    throw new Error('Password must contain at least one number (0-9)');
  }
  
  if (!/[!@#$%^&*]/.test(password)) {
    throw new Error('Password must contain at least one special character (!@#$%^&*)');
  }
  
  return true;
};

// Validate amount (FIX #1)
const validateAmount = (amount) => {
  const num = parseFloat(amount);
  
  if (isNaN(num) || num <= 0) {
    throw new Error('Amount must be a positive number');
  }
  
  if (num > 1000000) {
    throw new Error('Amount cannot exceed 1,000,000');
  }
  
  if (!/^\d+(\.\d{1,2})?$/.test(amount)) {
    throw new Error('Amount must have max 2 decimal places');
  }
  
  return true;
};

// Sanitize input (FIX #5 - Injection prevention)
const sanitizeInput = (str) => {
  if (typeof str !== 'string') return str;
  return validator.trim(validator.escape(str));
};

module.exports = {
  validateEmail,
  validatePassword,
  validateAmount,
  sanitizeInput
};