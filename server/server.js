import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import associations from './models/associations.js';
import User from './models/user_data.js';
import Profile from './models/profile.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api',profileRoutes);

// associations()

// Ensure DB connection and sync models
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});

// User.hasOne(Profile);
