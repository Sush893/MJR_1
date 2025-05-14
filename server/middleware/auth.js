import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from '../models/user_data.js';

dotenv.config();

export const protect = async (req, res, next) => {
  let token;
  
  console.log('🔒 AUTH: Authorization header:', req.headers.authorization ? 'Present' : 'Missing');
  
  // Check if token exists in the Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      
      if (!token) {
        console.log('❌ AUTH: Token is empty after Bearer prefix');
        return res.status(401).json({ error: 'Not authorized, token is empty' });
      }
      
      console.log(`🔒 AUTH: Verifying token: ${token.substring(0, 15)}...`);
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key');
      console.log('✅ AUTH: Token verified successfully, decoded payload:', decoded);
      
      // Find user by id (excluding password)
      const user = await User.findOne({ 
        where: { id: decoded.id },
        attributes: { exclude: ['password'] }
      });
      
      if (!user) {
        console.log('❌ AUTH: User not found for token');
        return res.status(401).json({ error: 'Not authorized, user not found' });
      }
      
      // Add user to request object
      req.user = user;
      console.log(`✅ AUTH: User ${user.email} (ID: ${user.id}) authenticated`);
      next();
    } catch (error) {
      console.error('❌ AUTH ERROR:', error.name, error.message);
      
      // More specific error messages
      if (error.name === 'JsonWebTokenError') {
        if (error.message === 'jwt malformed') {
          console.error('❌ AUTH: Token is malformed. Raw token:', token);
          return res.status(401).json({ error: 'Not authorized, malformed token' });
        } else {
          return res.status(401).json({ error: 'Not authorized, invalid token' });
        }
      } else if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Not authorized, token expired' });
      }
      
      return res.status(401).json({ error: 'Not authorized, token verification failed' });
    }
  } else {
    console.log('❌ AUTH: No Authorization header with Bearer token');
    return res.status(401).json({ error: 'Not authorized, no token' });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    console.log('❌ AUTH: User not admin');
    return res.status(403).json({ error: 'Not authorized as admin' });
  }
};
