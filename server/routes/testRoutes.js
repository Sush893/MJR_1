import express from 'express';
import { User } from '../models/index.js';

const router = express.Router();

// Test route to verify the router is working
router.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
});

// Create a test user
router.post('/create-user', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({
      username,
      email,
      password
    });
    res.status(201).json({ 
      message: 'User created successfully',
      userId: user.id
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ 
      message: 'Error creating user', 
      error: error.message 
    });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'email', 'role', 'createdAt']
    });
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ 
      message: 'Error fetching users', 
      error: error.message 
    });
  }
});

export default router; 