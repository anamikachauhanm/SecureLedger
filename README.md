# SecureLedger - Personal Finance Management System

A comprehensive, secure personal finance management application with a robust backend API and modern React frontend. Track income, expenses, manage budgets, and monitor bill reminders all in one place.

## 🎯 Features

### Core Functionality
- **Transaction Management**: Track income and expenses with categories and notes
- **Budget Tracking**: Set monthly budgets and monitor spending progress
- **Bill Reminders**: Never miss a payment with automatic reminders
- **Financial Analytics**: Visualize spending patterns with charts and insights
- **Monthly Summaries**: Review financial performance month-to-month
- **CSV Export**: Export transactions for external analysis

### User Experience
- **Secure Authentication**: JWT-based login with password hashing
- **Dark Mode**: Built-in dark theme support
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Data**: Live updates across all pages
- **User Preferences**: Customizable theme and currency settings

### Security
- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Protected Routes**: Role-based access control
- **CORS Enabled**: Secure cross-origin requests
- **Environment Variables**: Sensitive data protection

## 📁 Project Structure

```
SecureLedger/
├── backend/
│   ├── server.js                 # Express server entry point
│   ├── package.json              # Backend dependencies
│   ├── .env                      # Environment variables
│   ├── middleware/
│   │   └── auth.js              # Authentication middleware
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Transaction.js       # Transaction schema
│   │   ├── Budget.js            # Budget schema
│   │   └── Reminder.js          # Reminder schema
│   └── routes/
│       ├── auth.js              # Auth endpoints
│       ├── transactions.js      # Transaction endpoints
│       ├── budget.js            # Budget endpoints
│       ├── reminders.js         # Reminder endpoints
│       └── admin.js             # Admin endpoints
│
└── frontend/
    ├── src/
    │   ├── components/           # Reusable components
    │   ├── context/             # React Context
    │   ├── pages/               # Page components
    │   ├── services/            # API services
    │   ├── utils/               # Helper functions
    │   ├── App.tsx              # Main app
    │   ├── main.tsx             # Entry point
    │   └── index.css            # Global styles
    ├── vite.config.ts           # Vite config
    ├── tsconfig.json            # TypeScript config
    ├── package.json             # Frontend dependencies
    └── index.html               # HTML template
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

### Backend Setup

1. **Navigate to backend directory**

```bash
cd backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Create `.env` file**

```bash
MONGODB_URI=mongodb://localhost:27017/secureledger
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

4. **Start the backend server**

```bash
# Development mode with auto-reload
npm run dev

# Or production mode
npm start
```

The backend will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**

```bash
cd frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Create `.env` file**

```bash
VITE_API_URL=http://localhost:5000/api
```

4. **Start the development server**

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PATCH /api/auth/theme` - Update theme preference

### Transactions
- `GET /api/transactions` - List transactions (filterable)
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction
- `GET /api/transactions/summary/monthly` - Monthly summary
- `GET /api/transactions/export/csv` - Export to CSV

### Budget
- `GET /api/budget` - Get budgets with status
- `POST /api/budget` - Create/update budget
- `DELETE /api/budget/:id` - Delete budget

### Reminders
- `GET /api/reminders` - Get active reminders
- `POST /api/reminders` - Create reminder
- `DELETE /api/reminders/:id` - Delete reminder

### Admin
- `GET /api/admin/users` - List all users with stats
- `DELETE /api/admin/users/:id` - Delete user
- `PATCH /api/admin/users/:id/role` - Update user role

## 🔐 Authentication Flow

1. User registers/logs in with email and password
2. Backend validates credentials and returns JWT token
3. Frontend stores token in localStorage
4. Token is included in Authorization header for all requests
5. Expired tokens trigger automatic logout

## 🎨 Tech Stack

### Backend
- **Express.js** - Web framework
- **MongoDB & Mongoose** - Database and ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **dotenv** - Environment management
- **CORS** - Cross-origin requests

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **React Router v6** - Routing
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Axios** - HTTP client
- **Vite** - Build tool

## 📱 Pages & Features

| Page | Features |
|------|----------|
| **Login/Signup** | User authentication with JWT |
| **Dashboard** | Overview, charts, budget status, recent transactions |
| **Transactions** | CRUD operations, filters, recurring transactions, CSV export |
| **Budget** | Set limits, track spending, visual progress bars, alerts |
| **Reminders** | Bill reminders, due date alerts, status tracking |
| **Settings** | Theme preferences, profile info, logout |

## 🚢 Deployment

### Backend Deployment (Heroku/Railway/Render)

1. Set environment variables on hosting platform
2. Configure MongoDB connection
3. Deploy with `git push`

### Frontend Deployment (Vercel/Netlify)

1. Build production bundle: `npm run build`
2. Connect GitHub repo to hosting platform
3. Deploy automatically on push

## 📊 Database Schema

### User
- name, email, password, role, theme, currency
- timestamps

### Transaction
- userId, type, amount, category, note, date
- recurring options, timestamps

### Budget
- userId, category, limit, month
- unique index on (userId, category, month)

### Reminder
- userId, title, amount, dueDate, category, isActive
- timestamps

## 🔒 Security Best Practices

- ✅ Passwords hashed with bcryptjs (salt rounds: 12)
- ✅ JWT tokens with expiration
- ✅ Protected routes with role-based access
- ✅ CORS configured
- ✅ Environment variables for secrets
- ✅ Mongoose schema validation
- ✅ Input validation on both client and server

## 🐛 Troubleshooting

### Backend Won't Start
- Check MongoDB connection
- Verify `.env` file exists
- Check port 5000 is available

### Frontend Can't Connect to API
- Ensure backend is running
- Check `VITE_API_URL` in `.env`
- Verify CORS is enabled

### Port Already in Use
- Change port in `.env` (backend) or `vite.config.ts` (frontend)

## 📝 Development Guidelines

1. Follow project structure conventions
2. Use TypeScript for type safety
3. Write meaningful commit messages
4. Test thoroughly before committing
5. Update documentation as needed

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub.

## 🎉 Getting Started Quickly

```bash
# Clone the repository
git clone <repository-url>
cd SecureLedger

# Setup backend
cd backend
npm install
cp .env.example .env
npm run dev

# In another terminal, setup frontend
cd frontend
npm install
npm run dev

# Open http://localhost:3000 in your browser
```

## 📌 Next Steps

- [ ] Set up MongoDB
- [ ] Configure environment variables
- [ ] Start backend server
- [ ] Start frontend dev server
- [ ] Create an account and explore
- [ ] Add transactions and budgets
- [ ] Test all features
- [ ] Deploy to production

---

**SecureLedger** - Your personal finance management companion 💰📊
