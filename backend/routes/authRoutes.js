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

// Simple login endpoint
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email and password are required' 
      });
    }

    const user = dummyUsers[email];
    
    if (!user || user.password !== password) {
      return res.status(401).json({ 
        error: 'Invalid email or password' 
      });
    }

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user;
    
    // Generate JWT token
    const token = generateToken(userWithoutPassword);

    res.json({
      success: true,
      user: userWithoutPassword,
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

// Get available test accounts
router.get('/test-accounts', (req, res) => {
  const accounts = Object.keys(dummyUsers).map(email => ({
    email,
    password: dummyUsers[email].password,
    role: dummyUsers[email].role
  }));
  
  res.json({ accounts });
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
