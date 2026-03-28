# 🚀 SecureLedger - Deployment & GitHub Push Guide

## Part 1: Install Git (One-time Setup)

### Windows:
1. Download Git from: https://git-scm.com/download/win
2. Run the installer and accept all defaults
3. Restart Terminal/PowerShell
4. Verify installation: `git --version`

---

## Part 2: Configure Git Credentials

### First Time Only:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

---

## Part 3: Create GitHub Repository

1. Go to **https://github.com/new**
2. **Repository name:** `SecureLedger`
3. **Description:** Personal Finance Manager - Track expenses, budgets & financial goals
4. Choose **Public** (for group collaboration)
5. DO NOT initialize with README/GitIgnore/License
6. Click **Create Repository**
7. Copy the HTTPS URL (e.g., `https://github.com/YOUR-USERNAME/SecureLedger.git`)

---

## Part 4: Initialize Git & Push to GitHub

Open PowerShell in your project root (`c:\Users\triyko\Desktop\SecureLedger`) and run:

```bash
# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Complete SecureLedger application with full-stack features, authentication, and professional UI"

# Add remote repository (replace URL with your actual GitHub URL)
git remote add origin https://github.com/YOUR-USERNAME/SecureLedger.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Expected Output:
```
Enumerating objects: X, done.
Counting objects: X%, done.
Writing objects: X%, done.
Sending data to server... done.
...
 * [new branch]      main -> main
Branch 'main' is set up to track remote-tracking branch 'origin/main'.
```

---

## Part 5: Verify on GitHub

1. Refresh **https://github.com/YOUR-USERNAME/SecureLedger**
2. You should see all your files there!
3. Share this link with your group members
4. They can clone with: `git clone https://github.com/YOUR-USERNAME/SecureLedger.git`

---

## Part 6: Deployment Options

### Option A: Vercel (EASIEST - Recommended for React Frontend)
**For Frontend:**
1. Go to https://vercel.com/new
2. Connect your GitHub account
3. Select `SecureLedger` repository
4. Set Root Directory: `frontend`
5. Click Deploy
6. Frontend will be live at: `https://secureledger-XXXX.vercel.app`

### Option B: Render.com (Great for Backend)
**For Backend:**
1. Go to https://dashboard.render.com
2. New Web Service
3. Connect GitHub, select SecureLedger
4. Root Directory: `backend`
5. Environment: Node
6. Build command: `npm install`
7. Start command: `npm run dev`
8. Add these Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random string
   - `NODE_ENV`: production
9. Deploy
10. Backend will be live at: `https://secureledger-api.onrender.com`

### Option C: Railway.app (Simple Alternative)
**For Both:**
1. Go to https://railway.app
2. New Project → Connect GitHub
3. Select SecureLedger
4. Click Deploy
5. Set variables same as above

### Option D: Self-Hosted (Advanced)
- Use AWS EC2, DigitalOcean, or Heroku
- Follow their Node.js deployment guides
- Ensure MongoDB is accessible via connection string

---

## Part 7: Environment Configuration for Production

### Backend (.env for production):
```
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=5000
JWT_SECRET=your_super_secret_random_string_here
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-url.vercel.app
```

### Frontend (.env for production):
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

---

## Part 8: Update After Deployment

### To update after making changes:
```bash
git add .
git commit -m "Update: Description of changes"
git push origin main
```

Frontend (Vercel) and Backend (Render) will **auto-deploy** on push!

---

## Part 9: Invite Group Members

Share this with your team:
```
Repository: https://github.com/YOUR-USERNAME/SecureLedger
Live Frontend: https://secureledger-XXXX.vercel.app
Live Backend: https://secureledger-api.onrender.com
```

**To run locally:**
```bash
git clone https://github.com/YOUR-USERNAME/SecureLedger.git
cd SecureLedger
# Follow README.md instructions
```

---

## ✅ Quick Checklist

- [ ] Install Git
- [ ] Configure Git credentials
- [ ] Create GitHub repository
- [ ] Run git init and push to GitHub
- [ ] Deploy frontend to Vercel
- [ ] Deploy backend to Render/Railway
- [ ] Test both URLs
- [ ] Share with group members
- [ ] Update README with live URLs

---

## 🎯 What You Get After This

✅ Full-stack application deployed and live online  
✅ GitHub repository for version control and collaboration  
✅ Auto-deploy on every git push  
✅ Team can clone and contribute  
✅ Free tier should handle moderate traffic  

**You're ready to share with your group! 🚀**
