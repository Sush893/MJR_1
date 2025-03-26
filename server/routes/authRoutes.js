import express from 'express';
import { register, login, getUserProfile } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Get user profile - protected route
router.get('/profile', protect, getUserProfile);

export default router;
