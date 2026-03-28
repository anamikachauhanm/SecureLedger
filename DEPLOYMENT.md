# 🚀 Deployment & GitHub Guide

## Publishing to GitHub

### Step 1: Initialize Git (if not already done)

```bash
cd c:\Users\triyko\Desktop\SecureLedger
git init
git add .
git commit -m "Initial commit: SecureLedger - Complete personal finance management application"
```

### Step 2: Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click "New" to create a new repository
3. Name it `SecureLedger`
4. Add description: "Personal Finance Management System with React Frontend and Node.js Backend"
5. Choose Public or Private (Public for portfolio)
6. **DO NOT** initialize with README (already created)
7. Click "Create repository"

### Step 3: Push to GitHub

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/SecureLedger.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 4: Add Collaborators (Optional)

1. Go to Settings → Collaborators
2. Add team members
3. Set permissions

## Deployment Strategies

### 🔵 Option 1: Deploy Backend on Railway (Recommended for Beginners)

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Create new project
4. Connect GitHub repository
5. Select `backend` folder as root
6. Add MongoDB plugin
7. Set environment variables:
   - `MONGODB_URI` (provided by Railway)
   - `JWT_SECRET` (create a secure one)
   - `PORT` (set to 5000 or higher)
8. Deploy automatically on push

**Cost**: Free tier available ($5 credit/month)

### 🟢 Option 2: Deploy Frontend on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import project
4. Select `frontend` as root directory
5. Add environment variable: `VITE_API_URL` (your backend URL)
6. Deploy

**Cost**: Free tier available

### 🟠 Option 3: Full Stack on Render

1. Go to [render.com](https://render.com)
2. Create new Web Service for backend
3. Connect GitHub repository
4. Set Build Command: `npm install`
5. Set Start Command: `npm start`
6. Add environment variables
7. Deploy

### 🟡 Option 4: Self-Hosted (VPS/Dedicated Server)

```bash
# Backend Setup
ssh user@server
git clone https://github.com/YOUR_USERNAME/SecureLedger.git
cd SecureLedger/backend
npm install
npm run build  # if needed
nohup npm start > app.log 2>&1 &

# Frontend Setup
cd ../frontend
npm run build
# Copy dist folder to web server (nginx/apache)
```

## Environment Variables

### Backend (.env)
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
PORT=5000
NODE_ENV=production
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-domain.com/api
```

## GitHub Best Practices

### Branch Strategy

```bash
# Main branch - production ready
# Develop branch - development
# Feature branches - feature/feature-name

git checkout -b develop
git checkout -b feature/new-feature
```

### Commit Messages

```
feat: Add user authentication
fix: Resolve budget calculation bug
docs: Update README with setup instructions
style: Format code with Prettier
refactor: Reorganize auth middleware
test: Add transaction tests
```

### Pull Request Process

1. Create feature branch
2. Make changes locally
3. Run tests and linting
4. Push to GitHub
5. Create Pull Request
6. Request review
7. Merge to main after approval

## Monitoring & Maintenance

### Monitor Application Health

- Set up error tracking with [Sentry](https://sentry.io)
- Use [Uptime Robot](https://uptimerobot.com) for monitoring
- Set up alerts for critical issues

### Backup Strategy

- Regular MongoDB backups
- Database snapshots
- Code backups on GitHub

### Updates & Security

- Keep dependencies updated: `npm update`
- Check security: `npm audit`
- Review GitHub security alerts

## Performance Optimization

### Frontend
- Run `npm run build` for production
- Use CDN for static assets
- Enable gzip compression
- Optimize images
- Lazy load routes

### Backend
- Add caching layer (Redis)
- Optimize database queries
- Rate limiting
- Load balancing

## Securing Sensitive Data

1. Never commit `.env` files
2. Use `.gitignore` for secrets
3. Store secrets in environment variables
4. Use GitHub Secrets for CI/CD
5. Rotate JWT secret regularly
6. Use strong database passwords

## Continuous Integration/Deployment (CI/CD)

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: cd backend && npm install && npm run build
      - run: cd frontend && npm install && npm run build
```

## Troubleshooting Deployments

### Backend won't start
- Check MongoDB connection string
- Verify environment variables
- Check logs: `pm2 logs`

### Frontend blank page
- Check CORS settings
- Verify API endpoint
- Check browser console for errors

### Performance issues
- Monitor server resources
- Check database queries
- Review CDN logs

## Cost Breakdown

| Service | Free Tier | Paid Tier | Purpose |
|---------|-----------|-----------|---------|
| Railway | $5/month | Pay as you go | Backend hosting |
| Vercel | Yes | $20+/month | Frontend hosting |
| MongoDB Atlas | 512MB | $57+/month | Database |
| Total (Free) | ~$5/month | - | - |

## Next Steps

1. ✅ Push code to GitHub
2. ✅ Deploy backend to Railway/Render
3. ✅ Deploy frontend to Vercel
4. ✅ Set up monitoring
5. ✅ Configure CI/CD
6. ✅ Set up backups
7. ✅ Monitor performance
8. ✅ Share with others

## Resources

- [GitHub Docs](https://docs.github.com)
- [Railway Docs](https://railway.app/docs)
- [Vercel Docs](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
- [React Deployment](https://create-react-app.dev/deployment)
- [Express.js Deployment](https://expressjs.com/en/advanced/best-practice-performance.html)

---

**Happy deploying!** 🚀
