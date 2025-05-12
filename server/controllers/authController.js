import User from "../models/user_data.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { log } from "console";

dotenv.config();

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const signUp = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ full_name: fullName, email, password: hashedPassword });
    
    if (newUser) {
      // Create a user object without the password for the response
      const userResponse = {
        id: newUser.id,
        full_name: newUser.full_name,
        email: newUser.email
      };
      
      const token = generateToken(userResponse);
      
      // Return both the token and user data
      return res.status(201).json({ 
        message: 'User created successfully', 
        user: userResponse,
        token 
      });
    } else {
      return res.status(400).json({ error: 'Failed to create user' });
    }
  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ error: 'Error signing up' });
  }
};

export const signIn = async (req, res) => {
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
};

export const signOut = async (req, res) => {
  try {
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
};


