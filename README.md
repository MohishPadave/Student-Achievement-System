# 🎓 Student Achievement Portal

A comprehensive web application for managing and showcasing student achievements, built with React.js frontend and Node.js backend.

## 🚀 Live Demo

- **Frontend:** [Deploy on Vercel](https://vercel.com)
- **Backend:** [Deploy on Railway](https://railway.app)

## 📋 Features

### 🔐 Authentication System
- **Dummy Login System** (for testing and development)
- **Role-based Access Control** (Admin, Student, Faculty)
- **JWT Token Authentication**
- **Protected Routes**

### 👨‍🎓 Student Features
- Personal profile management
- Achievement tracking across multiple categories:
  - 🏢 Internships
  - 📜 Certifications & Courses
  - 🔬 Technical Activities
  - 🎨 Non-Technical Activities
  - 📄 Paper Publications
  - 🚀 Entrepreneurship Projects
  - 🤝 Volunteering Experience
  - 🎯 Workshops
  - 🏆 Other Achievements

### 👨‍🏫 Faculty Features
- View student achievements
- Filter and search functionality
- Export capabilities
- Student progress monitoring

### 👨‍💼 Admin Features
- Bulk data upload via Excel
- User management
- System analytics
- Contact form management

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI Framework
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Zustand** - State Management
- **Axios** - HTTP Client
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime
- **Express.js** - Web Framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Multer** - File Upload
- **CORS** - Cross-Origin Resource Sharing

### Database
- **MongoDB Atlas** - Cloud Database
- **Database Name:** `StudentPortal`
- **Collections:** 13+ collections for different data types

## 🔑 Test Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@test.com` | `admin123` |
| **Student** | `student@test.com` | `student123` |
| **Faculty** | `faculty@test.com` | `faculty123` |

## 🚀 Quick Start

### Prerequisites
- Node.js (v18.0.0 or higher)
- MongoDB Atlas account
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/MohishPadave/Student-Achievement-System.git
   cd Student-Achievement-System
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Update .env with your MongoDB connection string
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # Update .env with your backend URL
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173 or http://localhost:5174
   - Backend: http://localhost:3000

## 🌐 Deployment

### Deploy to Vercel (Frontend)
1. Connect your GitHub repository to Vercel
2. Set root directory to `frontend`
3. Add environment variable: `VITE_BACKEND_URL`
4. Deploy

### Deploy to Railway (Backend)
1. Connect your GitHub repository to Railway
2. Set root directory to `backend`
3. Add environment variables:
   - `JWT_SECRET`
   - `SESSION_SECRET`
   - `MONGO_URI`
   - `FRONTEND_URL`
4. Deploy

📖 **Detailed deployment guide:** [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## 📊 API Endpoints

### Authentication
- `POST /auth/login` - User login
- `GET /auth/logout` - User logout
- `GET /auth/profile` - Get user profile
- `GET /auth/test-accounts` - Get test credentials

### Health & Monitoring
- `GET /health` - Server health check
- `GET /db-info` - Database information

### Student Routes (Protected)
- `GET /student/personal-info` - Get personal information
- `POST /student/upload/personal-info` - Create personal info
- `PUT /student/personal-info` - Update personal info
- `GET /student/activity-status` - Get activity completion status

### Admin Routes (Protected)
- `POST /admin/upload/students` - Bulk upload students
- `POST /admin/upload/faculty` - Bulk upload faculty

### Contact
- `POST /contact-us/message` - Submit contact form
- `GET /contact-us/messages` - Get all messages (admin)

## 📁 Project Structure

```
Student-Achievement-System/
├── backend/                 # Node.js backend
│   ├── config/             # Database & passport config
│   ├── controllers/        # Route controllers
│   ├── middlewares/        # Auth & upload middlewares
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   └── app.js             # Main application file
├── frontend/               # React.js frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── forms/         # Form components
│   │   ├── context/       # State management
│   │   └── services/      # API services
│   └── public/            # Static assets
├── docs/                  # Documentation files
└── README.md             # This file
```

## 🔒 Security Features

- **JWT Authentication** with 1-hour expiration
- **Role-based Access Control** (RBAC)
- **CORS Protection** for cross-origin requests
- **Input Validation** on all forms
- **Protected Routes** on both frontend and backend
- **Environment Variables** for sensitive data

## 📚 Documentation

- [📋 Deployment Guide](./DEPLOYMENT_GUIDE.md) - Complete deployment instructions
- [✅ Deploy Checklist](./deploy-checklist.md) - Step-by-step deployment checklist
- [💾 Database Info](./DATABASE_INFO.md) - Database schema and information
- [🔑 Login Credentials](./DUMMY_LOGIN_CREDENTIALS.md) - Test account details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Mohish Padave**
- GitHub: [@MohishPadave](https://github.com/MohishPadave)
- Email: mohishpadave@gmail.com

## 🙏 Acknowledgments

- VES Institute of Technology for the project inspiration
- MongoDB Atlas for database hosting
- Vercel and Railway for deployment platforms

---

⭐ **Star this repository if you found it helpful!**