# Deployment Checklist

## Pre-Deployment Steps

### 1. Code Preparation
- [ ] All code committed to GitHub
- [ ] `.env` files are in `.gitignore`
- [ ] `.env.example` files created with all required variables
- [ ] Package.json files have correct start scripts
- [ ] Node.js version specified in package.json

### 2. Database Setup
- [x] MongoDB Atlas cluster created ✅
- [x] Database user created with appropriate permissions ✅
- [x] Network access configured (allow all IPs: 0.0.0.0/0 for Railway) ✅
- [x] Connection string ready ✅
- [x] Database populated with sample data (107 documents across 16 collections) ✅

## Backend Deployment (Railway)

### 3. Railway Setup
- [ ] Railway account created
- [ ] New project created from GitHub repo
- [ ] Root directory set to `backend`
- [ ] Environment variables configured:
  - [ ] `JWT_SECRET`
  - [ ] `SESSION_SECRET`
  - [ ] `PORT` (usually auto-set by Railway)
  - [ ] `NODE_ENV=production`
  - [ ] `MONGO_URI`
  - [ ] `FRONTEND_URL` (will update after Vercel deployment)

### 4. Backend Testing
- [ ] Deployment successful (check Railway logs)
- [ ] Health check endpoint working: `https://your-app.railway.app/health`
- [ ] Test accounts endpoint working: `https://your-app.railway.app/auth/test-accounts`

## Frontend Deployment (Vercel)

### 5. Vercel Setup
- [ ] Vercel account created
- [ ] New project created from GitHub repo
- [ ] Root directory set to `frontend`
- [ ] Framework preset: Vite
- [ ] Environment variables configured:
  - [ ] `VITE_BACKEND_URL` (your Railway URL)

### 6. Frontend Testing
- [ ] Deployment successful
- [ ] App loads at Vercel URL
- [ ] Can access login page
- [ ] Test login functionality

## Post-Deployment Configuration

### 7. CORS Update
- [ ] Copy Vercel URL
- [ ] Update `FRONTEND_URL` in Railway environment variables
- [ ] Redeploy backend on Railway

### 8. Final Testing
- [ ] Login with admin account: `admin@test.com` / `admin123`
- [ ] Login with student account: `student@test.com` / `student123`
- [ ] Login with faculty account: `faculty@test.com` / `faculty123`
- [ ] Test logout functionality
- [ ] Test navigation between dashboard sections
- [ ] Check browser console for errors

## URLs to Save
- **Frontend (Vercel):** `https://your-app-name.vercel.app`
- **Backend (Railway):** `https://your-app-name.railway.app`
- **Database:** MongoDB Atlas connection string

## Common Issues & Solutions

### CORS Errors
- Ensure `FRONTEND_URL` in Railway exactly matches Vercel URL
- Both URLs should use HTTPS

### Build Failures
- Check Node.js version compatibility
- Verify all dependencies in package.json
- Check build logs for specific errors

### Database Connection Issues
- Verify MongoDB connection string
- Check network access settings in MongoDB Atlas
- Ensure Railway can connect to external databases

### Environment Variable Issues
- Double-check all variable names (case-sensitive)
- Ensure no trailing spaces in values
- Verify VITE_ prefix for frontend variables

## Security Reminders
- [ ] Strong JWT_SECRET generated
- [ ] Strong SESSION_SECRET generated
- [ ] No sensitive data in public repositories
- [ ] MongoDB user has minimal required permissions
- [ ] Regular monitoring of application logs