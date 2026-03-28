# 🆘 FAQ & Troubleshooting

## Common Issues & Solutions

### Installation Issues

#### ❌ npm install fails
```bash
# Solution 1: Clear cache and try again
npm cache clean --force
rm -rf node_modules
rm package-lock.json
npm install

# Solution 2: Use different npm version
npm install -g npm@latest
npm install
```

#### ❌ Node modules too large
```bash
# Use npm ci instead for faster installation
npm ci

# Or use yarn
yarn install
```

#### ❌ Permission denied error
```bash
# On Mac/Linux
sudo npm install

# Or use nvm to avoid sudo
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

---

### Server Issues

#### ❌ Backend server won't start
**Error:** `Error: connect ECONNREFUSED 127.0.0.1:27017`

**Solution:**
```bash
# Check if MongoDB is running
# Windows: Open Task Manager and look for MongoDB
# Mac: brew services list | grep mongodb
# Linux: sudo systemctl status mongod

# Start MongoDB if not running
# Windows: net start MongoDB (as admin)
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env to your Atlas connection string
```

#### ❌ Port 5000 already in use
**Error:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Change port in .env
PORT=8000

# Or kill the process using the port
# Windows: netstat -ano | findstr :5000
# Then: taskkill /PID <PID> /F

# Mac/Linux: lsof -i :5000
# Then: kill -9 <PID>
```

#### ❌ MongoDB connection string error
```bash
# Check .env file has correct format
MONGODB_URI=mongodb://username:password@host:port/database

# For local MongoDB
MONGODB_URI=mongodb://localhost:27017/secureledger

# For MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/secureledger?retryWrites=true&w=majority
```

---

### Frontend Issues

#### ❌ Frontend won't start
**Error:** `Error: getaddrinfo ENOTFOUND localhost`

**Solution:**
```bash
# Make sure both frontend and backend are running
# Check backend is running on correct port
curl http://localhost:5000

# Update VITE_API_URL in .env
VITE_API_URL=http://localhost:5000/api

# Clear vite cache
rm -rf node_modules/.vite
npm run dev
```

#### ❌ Port 3000 already in use
**Error:** `Port 3000 is in use, try running on a different port?`

**Solution:**
```bash
# Edit vite.config.ts
server: {
  port: 3001  // Change to different port
}

# Or kill process on port 3000
# Windows: netstat -ano | findstr :3000
# Mac/Linux: lsof -i :3000
```

#### ❌ Blank page or API errors
**Check browser console (F12 → Console):**

```javascript
// Error examples and solutions:
// "Failed to fetch from /api/*"
// → Backend not running or wrong VITE_API_URL

// "401 Unauthorized"
// → Token expired, try logging out and back in

// "CORS error"
// → Backend CORS not configured correctly
```

#### ❌ Styles not loading
```bash
# Rebuild Tailwind CSS
npm run dev

# Or clear build cache
rm -rf dist
npm run build

# Check tailwind.config.js has correct content paths
```

---

### Authentication Issues

#### ❌ Can't login - "Invalid credentials"
**Check:**
1. Is backend running?
2. Is email correct?
3. Is password correct?
4. Is MongoDB running?

**Solution:**
```bash
# Check backend logs for errors
# Create a test user in MongoDB directly

# Reset password (create new account)
# Click "Sign up" instead
```

#### ❌ Logged out unexpectedly
**Cause:** Token expired (default: 24 hours)

**Solution:**
```bash
# Normal behavior - just login again
# For longer sessions, update JWT_SECRET in backend
```

#### ❌ Token not being sent with requests
**Solution:**
```javascript
// Check authService.ts has interceptor configured
// Verify token is in localStorage
localStorage.getItem('token')

// Check Authorization header format
// Should be: "Bearer <token>"
```

---

### Data Issues

#### ❌ Transactions not showing
**Check:**
1. Are you logged in?
2. Did you add transactions?
3. Is the date filter correct?
4. Is backend running?

**Solution:**
```bash
# Check backend logs
# Verify MongoDB has data
# Clear browser cache (Ctrl+Shift+Delete)
# Hard refresh (Ctrl+F5)
```

#### ❌ Budget alert not showing
**Cause:** Budget limit depends on transaction date

**Solution:**
```bash
# Ensure transaction date matches budget month
# Budget is for: YYYY-MM
# Transaction date must be: YYYY-MM-DD in same month
```

#### ❌ Reminder due dates wrong
**Cause:** Due date is day of month (1-31)

**Solution:**
```bash
# If today is March 15, and reminder due date is 10
# It means reminder is due on April 10 (next occurrence)

# For recurring reminders, set day of month only
```

---

### Export Issues

#### ❌ CSV export not working
**Error:** File not downloading

**Solution:**
1. Check pop-up blocker isn't enabled
2. Try different browser
3. Check browser console for errors
4. Ensure there are transactions to export

**Manual CSV export:**
```bash
# Directly from MongoDB
mongoexport --db secureledger --collection transactions --type csv --fields=date,category,amount,type,note --out transactions.csv
```

---

### Performance Issues

#### ❌ App is slow
```bash
# Frontend optimization
npm run build  # Production build

# Backend optimization
# Check MongoDB indexes
# Monitor API response times

# Clear browser cache
# Increase server RAM
```

#### ❌ Dashboard takes long to load
```bash
# Check network tab (F12 → Network)
# See which requests are slow

# Possible causes:
# - MongoDB query slow (add indexes)
# - API endpoint inefficient
# - Too many transactions
```

---

### Deployment Issues

#### ❌ Deployed backend returns 404
**Check:**
1. Deployment URL is correct
2. API is deployed
3. Environment variables are set
4. Port forwarding is correct

#### ❌ Frontend can't reach deployed backend
```javascript
// Update VITE_API_URL for production
VITE_API_URL=https://your-api-domain.com/api

// Then rebuild
npm run build
```

#### ❌ Database not accessible from hosting
```bash
# Check MongoDB connection string
# Whitelist your hosting provider's IP
# MongoDB Atlas: Security → Network Access → Add IP

# For self-hosted MongoDB:
# Add new host IP to connection string
# Check firewall rules
```

---

## FAQ

### Q: Can I use SQLite instead of MongoDB?
**A:** Not with current code. Would need to rewrite models. MongoDB is recommended.

### Q: How do I change the currency?
**A:** Go to Settings. Currency is set per user during account creation. Contact admin to change.

### Q: Can multiple users share a budget?
**A:** Not currently. Feature coming soon.

### Q: How long do JWT tokens last?
**A:** Configure in backend. Default typically 24 hours.

### Q: Can I export more than one month?
**A:** Currently exports current month. Filter by month first, then export.

### Q: Is data encrypted?
**A:** Passwords are hashed. Data transfer uses HTTPS (on production).

### Q: How do I delete my account?
**A:** Go to backend admin endpoints or contact administrator.

### Q: Can I transfer data between accounts?
**A:** Not yet. Feature for future development.

### Q: Is there a mobile app?
**A:** Not yet. Website is responsive and works on mobile browsers.

### Q: Do you have two-factor authentication?
**A:** Not yet. Planned for future release.

### Q: How are backups handled?
**A:** Depends on hosting. Set up regular MongoDB backups.

---

## Debug Mode

### Enable detailed logging

**Frontend** (main.tsx):
```typescript
if (import.meta.env.DEV) {
  console.log('Development Mode');
}
```

**Backend** (server.js):
```javascript
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});
```

### Check Network Requests

1. Open DevTools (F12)
2. Go to Network tab
3. Perform action
4. Check request/response
5. Look for errors

### MongoDB Debug

```bash
# View all databases
mongo --eval "db.adminCommand('listDatabases')"

# View collections in secureledger
mongo secureledger --eval "db.getCollectionNames()"

# Check data
mongo secureledger --eval "db.transactions.find().limit(1).pretty()"
```

---

## Getting Help

1. **Check this FAQ first**
2. **Review logs** - See what error is actually occurring
3. **Stack Overflow** - Search for the error message
4. **GitHub Issues** - Check if others reported it
5. **Contact support** - Email with detailed error message

---

**Still stuck?** Create an issue on GitHub with:
- Error message (exact copy)
- What you were trying to do
- Steps to reproduce
- Your environment (OS, Node version, etc.)

---

Happy troubleshooting! 🔧✨
