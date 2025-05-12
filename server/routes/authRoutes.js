import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user_data.js';
import { signIn, signUp } from '../controllers/authController.js';

const router = express.Router();

// Sign Up
router.post('/signup', signUp);
router.post('/signin', signIn);


export default router;
