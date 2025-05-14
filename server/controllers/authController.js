import User from "../models/user_data.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateToken = (user) => {
  const payload = { 
    id: user.id, 
    email: user.email 
  };
  const secret = process.env.JWT_SECRET || 'your_jwt_secret_key';
  
  // Log JWT generation details (without revealing the secret)
  console.log(`🔑 JWT: Generating token for user ID ${user.id} with email ${user.email}`);
  console.log(`🔑 JWT: Using secret key ${secret === 'your_jwt_secret_key' ? '(default fallback)' : '(from env)'}`);
  
  const token = jwt.sign(payload, secret, {
    expiresIn: "1d",
  });
  
  // Validate the generated token
  try {
    jwt.verify(token, secret);
    console.log(`✅ JWT: Token verified successfully, length: ${token.length} characters`);
  } catch (error) {
    console.error(`❌ JWT ERROR: Generated token verification failed: ${error.message}`);
  }
  
  return token;
};

export const signUp = async (req, res) => {
  const { fullName, email, password } = req.body;
  console.log('📝 SIGNUP: Received request for:', email);

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log(`⚠️ SIGNUP: User with email ${email} already exists`);
      return res.status(400).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ full_name: fullName, email, password: hashedPassword });
    
    if (newUser) {
      // Create a user object without the password for the response
      const userResponse = {
        id: newUser.id,
        full_name: newUser.full_name,
        email: newUser.email,
        created_at: new Date().toISOString()
      };
      
      const token = generateToken(userResponse);
      console.log(`✅ SIGNUP: Successfully created user with ID ${newUser.id}`);
      
      // Return both the token and user data
      return res.status(201).json({ 
        message: 'User created successfully', 
        user: userResponse,
        token 
      });
    } else {
      console.log(`❌ SIGNUP: Failed to create user - invalid data`);
      return res.status(400).json({ error: 'Failed to create user' });
    }
  } catch (err) {
    console.error('❌ SIGNUP ERROR:', err);
    res.status(500).json({ error: 'Error signing up' });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  console.log('🔑 SIGNIN: Received login request for:', email);

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log(`⚠️ SIGNIN: No user found with email ${email}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log(`⚠️ SIGNIN: Invalid password for user ${email}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create a user object without the password for the response
    const userResponse = {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      created_at: new Date().toISOString()
    };
    
    const token = generateToken(userResponse);
    console.log(`✅ SIGNIN: User ${email} (ID: ${user.id}) logged in successfully`);
    
    res.status(200).json({ 
      message: 'Sign-in successful', 
      user: userResponse,
      token 
    });
  } catch (err) {
    console.error('❌ SIGNIN ERROR:', err);
    res.status(500).json({ error: 'Error signing in' });
  }
};

export const signOut = async (req, res) => {
  try {
    console.log('🚪 SIGNOUT: Processing signout request');
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error('❌ SIGNOUT ERROR:', error);
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
};


