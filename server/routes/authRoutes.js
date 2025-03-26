import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user_data.js';

const router = express.Router();

// Sign Up
router.post('/signup', async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ full_name: fullName, email, password: hashedPassword });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ error: 'Error signing up' });
  }
});

// Sign In
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Sign-in successful', user });
  } catch (err) {
    console.error('Signin Error:', err);
    res.status(500).json({ error: 'Error signing in' });
  }
});

export default router;
