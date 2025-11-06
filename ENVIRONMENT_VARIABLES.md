# 🔧 Environment Variables Reference

## 📋 **Complete Environment Variables**

### **Backend (Railway) Environment Variables:**

```env
NODE_ENV=production
JWT_SECRET=StudentAchievementPortal2024JWTSecretKey
SESSION_SECRET=StudentAchievementPortal2024SessionSecretKey
MONGO_URI=mongodb+srv://yroshan504:JiNGcMnJ1TDwedk2@students-achievements-c.ypfecl6.mongodb.net/StudentPortal?retryWrites=true&w=majority&appName=Students-Achievements-Cluster
FRONTEND_URL=https://student-achievement-system.vercel.app
PORT=3000
```

### **Frontend (Vercel) Environment Variables:**

```env
VITE_BACKEND_URL=https://your-railway-backend.railway.app
```

## 🚀 **Railway Configuration**

Copy and paste these **exact values** into Railway:

| Variable Name | Value |
|---------------|-------|
| `NODE_ENV` | `production` |
| `JWT_SECRET` | `StudentAchievementPortal2024JWTSecretKey` |
| `SESSION_SECRET` | `StudentAchievementPortal2024SessionSecretKey` |
| `MONGO_URI` | `mongodb+srv://yroshan504:JiNGcMnJ1TDwedk2@students-achievements-c.ypfecl6.mongodb.net/StudentPortal?retryWrites=true&w=majority&appName=Students-Achievements-Cluster` |
| `FRONTEND_URL` | `https://student-achievement-system.vercel.app` |

## 🌐 **Vercel Configuration**

| Variable Name | Value |
|---------------|-------|
| `VITE_BACKEND_URL` | `https://your-railway-backend.railway.app` |

## 🔒 **Variable Descriptions**

- **NODE_ENV**: Sets application to production mode
- **JWT_SECRET**: Secret key for JWT token signing and verification
- **SESSION_SECRET**: Secret key for session management
- **MONGO_URI**: Complete MongoDB Atlas connection string with database name
- **FRONTEND_URL**: Vercel frontend URL for CORS configuration
- **VITE_BACKEND_URL**: Railway backend URL for API calls

## ✅ **Verification**

After setting these variables:

1. **Railway Health Check**: `https://your-railway-url/health`
2. **Test Accounts**: `https://your-railway-url/auth/test-accounts`
3. **Frontend Login**: `https://student-achievement-system.vercel.app/login`

## 🔄 **Update Process**

1. **Set Railway variables** → Deploy backend
2. **Get Railway URL** → Update Vercel `VITE_BACKEND_URL`
3. **Redeploy Vercel** → Complete setup

All environment variables are now consistent across the entire codebase! 🎯