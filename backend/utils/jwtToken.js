import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Generate JWT Token (expires in 1h)
const generateToken = (user) => {
  console.log('🎫 JWT Generation - User data:', JSON.stringify(user, null, 2));
  console.log('🔐 JWT Secret available:', process.env.JWT_SECRET ? 'YES' : 'NO');
  console.log('🔐 JWT Secret length:', process.env.JWT_SECRET ? process.env.JWT_SECRET.length : 0);
  
  try {
    const token = jwt.sign(
      { user },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    console.log('✅ JWT token generated successfully');
    console.log('🎫 Token preview:', token.substring(0, 50) + '...');
    return token;
  } catch (error) {
    console.error('💥 JWT generation error:', error);
    throw error;
  }
};

// Verify JWT Token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
};

export { generateToken, verifyToken };
