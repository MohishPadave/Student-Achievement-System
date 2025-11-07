import dotenv from 'dotenv';
import express from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import internshipsRoutes from './routes/internshipsRoutes.js';
import certificationRoutes from './routes/course_certificationsRoutes.js'
import studentPersonalInfo from './routes/student_personal_infoRoutes.js';
import contactUsRoutes from './routes/contact_usRoutes.js';
import technicalActivityRoutes from './routes/technical_activitiesRoutes.js';
import nonTechnicalActivityRoutes from './routes/non_technical_activitiesRoutes.js'
import paperPublicationRoutes from './routes/paper_publicationsRoutes.js'
import workshopRoutes from './routes/workshopRoutes.js'
import volunteeringRoutes from './routes/volunteering_experienceRoutes.js';
import EntrepreneurshipRoutes from './routes/entrepreneurship_projectsRoutes.js'
import OtherAchievementsRoutes from './routes/other_achievementsRoutes.js'

// Removed passport config - using simple dummy auth
import {connectDB} from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import filterRoutes from './routes/filterRoutes.js'

dotenv.config();

const app = express();

// Connect to database before starting server
async function startServer() {
  try {
    await connectDB();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
}

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://student-achievement-system.vercel.app',
  'http://localhost:5173',
  'http://localhost:5174'
];

app.use(cors({ 
  origin: function (origin, callback) {
    console.log('🌐 CORS Check - Origin:', origin);
    console.log('🌐 CORS Check - Allowed origins:', allowedOrigins);
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      console.log('✅ CORS - No origin, allowing request');
      return callback(null, true);
    }
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      console.log('✅ CORS - Origin allowed');
      callback(null, true);
    } else {
      console.log('❌ CORS - Origin not allowed');
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true 
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.path} - Origin: ${req.get('origin')} - Time: ${new Date().toISOString()}`);
  console.log(`📦 Body:`, req.body);
  console.log(`📋 Content-Type:`, req.get('content-type'));
  next();
});

// Removed passport initialization

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Student Achievement Portal API',
    status: 'running',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: '/auth/*',
      testAccounts: '/auth/test-accounts'
    }
  });
});

// Test POST endpoint
app.post('/test-post', (req, res) => {
  console.log('🧪 Test POST endpoint hit');
  console.log('📦 Body:', req.body);
  res.json({ 
    message: 'POST request successful',
    body: req.body,
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    // Check database connection
    const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
    const dbName = mongoose.connection.name || 'Unknown';
    
    res.status(200).json({ 
      status: 'OK', 
      message: 'Server is running',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      database: {
        status: dbStatus,
        name: dbName,
        host: mongoose.connection.host || 'Unknown'
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      message: 'Health check failed',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Database info endpoint
app.get('/db-info', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        error: 'Database not connected'
      });
    }

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    
    const collectionStats = await Promise.all(
      collections.map(async (collection) => {
        try {
          const count = await db.collection(collection.name).countDocuments();
          return {
            name: collection.name,
            documentCount: count
          };
        } catch (error) {
          return {
            name: collection.name,
            documentCount: 'Error getting count',
            error: error.message
          };
        }
      })
    );

    res.json({
      database: {
        name: mongoose.connection.name,
        host: mongoose.connection.host,
        status: 'Connected',
        collections: collectionStats
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to get database info',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Routes general
app.use('/auth', authRoutes);
app.use('/contact-us', contactUsRoutes)

// admin routes
app.use('/admin',adminRoutes);

// student routes
app.use('/student',studentPersonalInfo);
app.use('/student',internshipsRoutes);
app.use('/student',certificationRoutes);
app.use('/student',technicalActivityRoutes);
app.use('/student',nonTechnicalActivityRoutes);
app.use('/student',paperPublicationRoutes);
app.use('/student',workshopRoutes);
app.use('/student',volunteeringRoutes);
app.use('/student',EntrepreneurshipRoutes);
app.use('/student',OtherAchievementsRoutes);
app.use('/api/faculty',filterRoutes);

// Start server after database connection
startServer().then(() => {
  const PORT = process.env.PORT || 3000;

  console.log('🚀 Starting server...');
  console.log('📊 Environment variables check:');
  console.log('  - PORT:', PORT);
  console.log('  - NODE_ENV:', process.env.NODE_ENV);
  console.log('  - FRONTEND_URL:', process.env.FRONTEND_URL);
  console.log('  - JWT_SECRET exists:', !!process.env.JWT_SECRET);
  console.log('  - MONGO_URI exists:', !!process.env.MONGO_URI);

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL}`);
    console.log(`🎯 Server is ready to accept connections`);
    console.log(`📡 Listening on 0.0.0.0:${PORT}`);
  });

  // Keep the process alive
  server.keepAliveTimeout = 65000;
  server.headersTimeout = 66000;

  server.on('error', (error) => {
    console.error('💥 Server error:', error);
    if (error.code === 'EADDRINUSE') {
      console.error(`❌ Port ${PORT} is already in use`);
    }
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
  });

  process.on('uncaughtException', (error) => {
    console.error('💥 Uncaught Exception:', error);
    process.exit(1);
  });
}).catch((error) => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});
