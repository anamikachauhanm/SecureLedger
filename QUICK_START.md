# 🚀 Quick Start Guide

Get SecureLedger up and running in 5 minutes!

## Prerequisites

Ensure you have installed:
- **Node.js** (v16+) - [Download](https://nodejs.org)
- **MongoDB** - Local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com)

## Step 1: Setup Backend

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your MongoDB URI and JWT secret
# MONGODB_URI=mongodb://localhost:27017/secureledger
# JWT_SECRET=your_secret_key_here

# Start server
npm run dev
```

✅ Backend running at `http://localhost:5000`

## Step 2: Setup Frontend

```bash
# In a new terminal, navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start dev server
npm run dev
```

✅ Frontend running at `http://localhost:3000`

## Step 3: Access the Application

1. Open browser to `http://localhost:3000`
2. Click "Sign up" to create account
3. Log in with your credentials
4. Start managing your finances! 🎉

## Test Credentials (Optional)

If you want to use demo data, create an account and explore!

## Common Commands

### Backend
```bash
npm run dev      # Development mode (auto-reload)
npm start        # Production mode
npm run lint     # Check code quality
```

### Frontend
```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Check code quality
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or update `MONGODB_URI` in `.env`
- For MongoDB Atlas, check your connection string and IP whitelist

### Port Already in Use
- Backend: Change PORT in `.env`
- Frontend: Update port in `vite.config.ts`

### Dependencies Installation Fails
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

## Feature Overview

### 📊 Dashboard
- Overview of income/expense
- Budget status
- Recent transactions
- Financial charts

### 💳 Transactions
- Add income/expense
- Categorize transactions
- Filter by type/category/month
- Export to CSV

### 💰 Budget
- Set monthly budgets
- Track spending
- Get alerts for overspending
- View spending percentage

### 📋 Reminders
- Create bill reminders
- Track due dates
- Get alerts for upcoming bills
- Sort by urgency

### ⚙️ Settings
- Switch theme (dark/light)
- View profile info
- Logout

## Next Steps

1. ✅ Create an account
2. ✅ Add some transactions
3. ✅ Set monthly budgets
4. ✅ Create bill reminders
5. ✅ Check dashboard analytics
6. ✅ Export data to CSV
7. ✅ Deploy to production

## Deployment

### Deploy Backend
- [Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Railway](https://railway.app)
- [Render](https://render.com)

### Deploy Frontend
- [Vercel](https://vercel.com)
- [Netlify](https://netlify.com)

## Need Help?

Check the main [README.md](./README.md) for detailed documentation!

---

**Happy Finance Managing!** 💸📈
