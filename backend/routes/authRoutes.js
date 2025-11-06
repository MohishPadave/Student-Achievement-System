import express from 'express';
import cookieParser from 'cookie-parser';
import { authenticate } from '../middlewares/auth.js';
import { generateToken } from '../utils/jwtToken.js';

const router = express.Router();

router.use(cookieParser());

// Dummy users for testing
const dummyUsers = {
  'admin@test.com': {
    password: 'admin123',
    email: 'admin@test.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    pic: 'https://via.placeholder.com/150'
  },
  'student@test.com': {
    password: 'student123',
    email: 'student@test.com',
    firstName: 'Student',
    lastName: 'User',
    role: 'student',
    pic: 'https://via.placeholder.com/150'
  },
  'faculty@test.com': {
    password: 'faculty123',
    email: 'faculty@test.com',
    firstName: 'Faculty',
    lastName: 'User',
    role: 'faculty',
    pic: 'https://via.placeholder.com/150'
  }
};

// Simple login endpoint with detailed logging
router.post('/login', (req, res) => {
  console.log('🔐 Login attempt started');
  console.log('📝 Request body:', JSON.stringify(req.body, null, 2));
  console.log('🌐 Request headers:', JSON.stringify(req.headers, null, 2));
  console.log('📍 Request origin:', req.get('origin'));
  
  try {
    const { email, password } = req.body;
    
    console.log('📧 Email received:', email);
    console.log('🔑 Password received:', password ? '[PROVIDED]' : '[MISSING]');

    if (!email || !password) {
      console.log('❌ Missing email or password');
      return res.status(400).json({ 
        error: 'Email and password are required' 
      });
    }

    const user = dummyUsers[email];
    console.log('👤 User found:', user ? 'YES' : 'NO');
    
    if (!user) {
      console.log('❌ User not found for email:', email);
      console.log('📋 Available emails:', Object.keys(dummyUsers));
      return res.status(401).json({ 
        error: 'Invalid email or password' 
      });
    }
    
    if (user.password !== password) {
      console.log('❌ Password mismatch');
      console.log('🔍 Expected:', user.password);
      console.log('🔍 Received:', password);
      return res.status(401).json({ 
        error: 'Invalid email or password' 
      });
    }

    console.log('✅ Authentication successful for:', email);

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user;
    
    // Generate JWT token
    console.log('🎫 Generating JWT token...');
    const token = generateToken(userWithoutPassword);
    console.log('✅ JWT token generated successfully');

    const response = {
      success: true,
      user: userWithoutPassword,
      token
    };
    
    console.log('📤 Sending response:', JSON.stringify(response, null, 2));
    res.json(response);

  } catch (error) {
    console.error('💥 Login error:', error);
    console.error('📊 Error stack:', error.stack);
    res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get available test accounts
router.get('/test-accounts', (req, res) => {
  console.log('📋 Test accounts requested');
  const accounts = Object.keys(dummyUsers).map(email => ({
    email,
    password: dummyUsers[email].password,
    role: dummyUsers[email].role
  }));
  
  console.log('📤 Returning accounts:', accounts);
  res.json({ accounts });
});

// Debug endpoint to check environment and configuration
router.get('/debug', (req, res) => {
  console.log('🔍 Debug endpoint called');
  
  const debugInfo = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    jwtSecretExists: !!process.env.JWT_SECRET,
    jwtSecretLength: process.env.JWT_SECRET ? process.env.JWT_SECRET.length : 0,
    sessionSecretExists: !!process.env.SESSION_SECRET,
    frontendUrl: process.env.FRONTEND_URL,
    availableUsers: Object.keys(dummyUsers),
    requestHeaders: {
      origin: req.get('origin'),
      userAgent: req.get('user-agent'),
      contentType: req.get('content-type')
    }
  };
  
  console.log('🔍 Debug info:', JSON.stringify(debugInfo, null, 2));
  res.json(debugInfo);
});

// Logout
router.get('/logout', (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
});

// Profile route
router.get('/profile', authenticate, (req, res) => {
  res.json({
    user: req.user,
  });
});

export default router;
