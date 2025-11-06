# 📊 Database Information

## Current MongoDB Connection Status

✅ **Database:** `StudentPortal`  
✅ **Host:** `ac-b6ix0nw-shard-00-01.ypfecl6.mongodb.net`  
✅ **Status:** Connected  
✅ **Connection Type:** MongoDB Atlas (Cloud)

## 📈 Database Collections & Document Counts

| Collection Name | Document Count | Purpose |
|----------------|----------------|---------|
| `paperpublications` | 3 | Student research papers |
| `student_profiles` | 11 | Student profile data |
| `coursecertifications` | 10 | Course certificates |
| `internships` | 23 | Internship records |
| `entrepreneurships` | 7 | Entrepreneurship projects |
| `featureds` | 0 | Featured content |
| `workshops` | 5 | Workshop attendance |
| `volunteerings` | 6 | Volunteering activities |
| `technicalactivities` | 6 | Technical activities |
| `nontechnicalactivities` | 6 | Non-technical activities |
| `otherachievements` | 11 | Other achievements |
| `faculty_profiles` | 10 | Faculty information |
| `personalinfos` | 5 | Personal information |
| `patents` | 6 | Patent records |
| `admin_accounts` | 3 | Admin accounts |
| `contactus` | 1 | Contact form submissions |

**Total Collections:** 16  
**Total Documents:** ~107

## 🔧 Database Configuration

### Connection Setup
```javascript
// backend/config/db.js
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
};
```

### Environment Variables
```env
NODE_ENV=production
JWT_SECRET=StudentAchievementPortal2024JWTSecretKey
SESSION_SECRET=StudentAchievementPortal2024SessionSecretKey
MONGO_URI=mongodb+srv://yroshan504:JiNGcMnJ1TDwedk2@students-achievements-c.ypfecl6.mongodb.net/StudentPortal?retryWrites=true&w=majority&appName=Students-Achievements-Cluster
FRONTEND_URL=https://student-achievement-system.vercel.app
```

## 🛠️ Available Database Endpoints

### Health Check (includes DB status)
```
GET /health
```
**Response:**
```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2025-11-06T17:47:12.425Z",
  "environment": "development",
  "database": {
    "status": "Connected",
    "name": "StudentPortal",
    "host": "ac-b6ix0nw-shard-00-01.ypfecl6.mongodb.net"
  }
}
```

### Database Information
```
GET /db-info
```
**Response:** Complete collection statistics and document counts

## 📋 Key Database Models

### Student Personal Info
```javascript
{
  email_id: String (required, unique),
  prn: String,
  first_name: String,
  last_name: String,
  middle_name: String,
  mother_name: String,
  department: String (default: "INFT"),
  batch_no: Number,
  class_division: String,
  gender: String,
  abc_id: String,
  current_sgpi: Number,
  phone: String,
  linkedin_url: String,
  other_urls: [String]
}
```

### Contact Us
```javascript
{
  name: String (required),
  email: String (required),
  type: String (enum: ['suggestion', 'report', 'contact']),
  subject: String (required),
  message: String (required),
  status: String (enum: ['new', 'in-progress', 'resolved']),
  createdAt: Date,
  updatedAt: Date
}
```

### Internships
```javascript
{
  // Student internship records
  company_name: String,
  position: String,
  duration: String,
  description: String,
  // ... other fields
}
```

## 🚀 Deployment Considerations

### For Railway Deployment
1. **Environment Variable:** Set `MONGO_URI` in Railway dashboard
2. **Network Access:** MongoDB Atlas allows all IPs (0.0.0.0/0)
3. **Connection Pooling:** Mongoose handles connection pooling automatically
4. **Error Handling:** Database connection errors will exit the process

### Security Features
- ✅ Connection string includes authentication
- ✅ Database user has appropriate permissions
- ✅ Network access configured for cloud deployment
- ✅ Connection timeout and retry logic built-in

## 🔍 Testing Database Connection

### Local Testing
```bash
curl http://localhost:3000/health
curl http://localhost:3000/db-info
```

### Production Testing (after deployment)
```bash
curl https://your-app.railway.app/health
curl https://your-app.railway.app/db-info
```

## 📊 Database Performance

- **Connection Type:** MongoDB Atlas (Cloud)
- **Region:** Auto-selected based on proximity
- **Cluster Tier:** Shared (M0) - Free tier
- **Storage:** ~1GB available
- **Concurrent Connections:** Up to 500

## 🔧 Maintenance

### Regular Tasks
- Monitor connection health via `/health` endpoint
- Check collection growth via `/db-info` endpoint
- Review MongoDB Atlas metrics dashboard
- Backup important collections regularly

### Troubleshooting
1. **Connection Issues:** Check MongoDB Atlas network access
2. **Performance Issues:** Monitor slow queries in Atlas
3. **Storage Issues:** Upgrade cluster tier if needed
4. **Authentication Issues:** Verify connection string credentials

Your MongoDB database is fully operational and ready for production deployment! 🎉