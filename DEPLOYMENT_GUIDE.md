# Deployment Guide

This guide will help you deploy the Student Achievements Portal to Vercel (frontend) and Railway (backend).

## Prerequisites

- GitHub account
- Vercel account
- Railway account
- MongoDB Atlas account (for database)

## Backend Deployment (Railway)

### 1. Prepare Your Repository
1. Push your code to GitHub
2. Make sure the `backend` folder contains all necessary files

### 2. Deploy to Railway
1. Go to [Railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Choose the `backend` folder as the root directory

### 3. Configure Environment Variables
In Railway dashboard, go to Variables tab and add:

```
JWT_SECRET=StudentAchievementPortal2024JWTSecretKey
SESSION_SECRET=StudentAchievementPortal2024SessionSecretKey
PORT=3000
NODE_ENV=production
FRONTEND_URL=https://student-achievement-system.vercel.app
MONGO_URI=your_mongodb_connection_string
```

### 4. Get Your Railway URL
- After deployment, Railway will provide a URL like: `https://your-app-name.railway.app`
- Copy this URL for frontend configuration

## Frontend Deployment (Vercel)

### 1. Deploy to Vercel
1. Go to [Vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Select your repository
5. Set the root directory to `frontend`
6. Framework Preset should auto-detect as "Vite"

### 2. Configure Environment Variables
In Vercel dashboard, go to Settings → Environment Variables and add:

```
VITE_BACKEND_URL=https://your-railway-app.railway.app
```

### 3. Update Backend CORS
After getting your Vercel URL (e.g., `https://student-achievement-system.vercel.app`):
1. Go back to Railway dashboard
2. Update the `FRONTEND_URL` environment variable with your Vercel URL
3. Redeploy the backend

## Test Your Deployment

### Login Credentials
- **Admin:** `admin@test.com` / `admin123`
- **Student:** `student@test.com` / `student123`
- **Faculty:** `faculty@test.com` / `faculty123`

### Verification Steps
1. Visit your Vercel URL
2. Try logging in with test credentials
3. Check that all dashboard functionalities work
4. Test logout functionality

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure `FRONTEND_URL` in Railway matches your Vercel URL exactly
   - Check that both URLs use HTTPS

2. **API Connection Issues**
   - Verify `VITE_BACKEND_URL` in Vercel points to your Railway URL
   - Ensure Railway app is running (check logs)

3. **Database Connection Issues**
   - Verify MongoDB connection string is correct
   - Check MongoDB Atlas network access settings

4. **Build Failures**
   - Check build logs in respective platforms
   - Ensure all dependencies are listed in package.json

### Checking Logs
- **Railway:** Go to your project → Deployments → View logs
- **Vercel:** Go to your project → Functions → View function logs

## Environment URLs

After successful deployment, you'll have:
- **Frontend:** `https://student-achievement-system.vercel.app`
- **Backend:** `https://your-app-name.railway.app`
- **Database:** MongoDB Atlas cluster

## Security Notes

- Never commit `.env` files to version control
- Use strong, unique secrets for JWT_SECRET and SESSION_SECRET
- Regularly rotate your secrets
- Monitor your application logs for any security issues

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review deployment logs
3. Verify all environment variables are set correctly
4. Ensure your MongoDB Atlas cluster allows connections from Railway's IP ranges