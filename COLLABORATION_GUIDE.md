# 👥 Group Collaboration Guide - SecureLedger

## For Group Members

### Step 1: Clone the Repository
```bash
git clone https://github.com/YOUR-USERNAME/SecureLedger.git
cd SecureLedger
```

### Step 2: Set Up Environment (Ask Project Lead for these)

**Backend (.env):**
```env
MONGODB_URI=mongodb://localhost:27017/secureledger
PORT=5000
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

**Frontend (.env.local):**
```env
VITE_API_URL=http://localhost:5000/api
```

### Step 3: Install Dependencies & Run

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000

---

## Git Workflow for Team Collaboration

### Creating a New Feature
```bash
# Pull latest changes
git pull origin main

# Create a feature branch
git checkout -b feature/your-feature-name

# Make changes and test
# ... edit files ...

# Stage and commit
git add .
git commit -m "Add: description of what you added"

# Push to your branch
git push origin feature/your-feature-name
```

### Create a Pull Request
1. Go to GitHub repo
2. Click "Compare & pull request"
3. Write description of changes
4. Submit for review
5. Once approved, merge to main

### Pull Latest Changes from Main
```bash
git pull origin main
```

---

## Project Structure

```
SecureLedger/
├── backend/
│   ├── models/           # Database schemas
│   ├── routes/           # API endpoints
│   ├── middleware/       # Auth & validation
│   ├── server.js         # Express server
│   └── seed-data.js      # Sample data
├── frontend/
│   ├── src/
│   │   ├── pages/        # React pages
│   │   ├── components/   # Reusable components
│   │   ├── services/     # API calls
│   │   ├── context/      # State management
│   │   └── utils/        # Helpers
│   └── public/           # Static assets
└── Documentation files
```

---

## MongoDB Setup for Local Development

### Windows:
1. Download: https://www.mongodb.com/try/download/community
2. Install MongoDB Community Edition
3. MongoDB runs on `mongodb://localhost:27017`
4. Or use MongoDB Atlas Cloud: https://www.mongodb.com/cloud/atlas

---

## Key Endpoints (Backend API)

### Authentication
- POST `/api/auth/signup` - Create account
- POST `/api/auth/login` - Login
- GET `/api/auth/me` - Get current user

### Transactions
- GET `/api/transactions` - Get all
- POST `/api/transactions` - Create
- PUT `/api/transactions/:id` - Update
- DELETE `/api/transactions/:id` - Delete

### Budgets
- GET `/api/budgets` - Get all
- POST `/api/budgets` - Create
- PUT `/api/budgets/:id` - Update
- DELETE `/api/budgets/:id` - Delete

### Reminders
- GET `/api/reminders` - Get all
- POST `/api/reminders` - Create
- PUT `/api/reminders/:id` - Update
- DELETE `/api/reminders/:id` - Delete

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Or use Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- For Atlas: Whitelist your IP at https://cloud.mongodb.com

### Frontend Won't Start
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## Coding Standards

### File Naming
- Components: PascalCase (Dashboard.tsx)
- Utils/Services: camelCase (authService.ts)
- Folders: lowercase (components/)

### Code Style
- Use TypeScript for type safety
- Follow Tailwind CSS utility-first styling
- Keep components small and reusable
- Add comments for complex logic

### Commits
- Write clear commit messages
- Use imperative mood: "Add feature" not "Added feature"
- Reference issues: "Fix: #42"

---

## Ready to Contribute? 🚀

1. Pick an issue or feature from the group
2. Create a branch: `git checkout -b feature/your-name`
3. Make changes and test
4. Push and create pull request
5. Get approval and merge!

**Questions? Ask the project lead (first name)!**
