import dotenv from 'dotenv';
// Load environment variables early
dotenv.config();

import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import pitchRoutes from './routes/pitchRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import setupAssociations from './models/associations.js';
import User from './models/user_data.js';
import Profile from './models/profile.js';

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Debug JWT Secret
console.log('JWT Secret available:', process.env.JWT_SECRET ? 'Yes' : 'No');

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173', // Support both general and specific CORS
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing multipart/form-data

// Debug route
app.get('/debug', (req, res) => {
  res.json({ 
    message: 'Server is healthy!',
    env: {
      nodeEnv: process.env.NODE_ENV,
      port: process.env.PORT,
      jwtAvailable: !!process.env.JWT_SECRET,
      dbHost: process.env.PG_HOST
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!', error: err.message });
});

// Setup routes
app.use('/api', authRoutes);
app.use('/api', profileRoutes);
app.use('/api', pitchRoutes);
app.use('/api', projectRoutes);
app.use('/api', eventRoutes);
app.use('/api', uploadRoutes); // Add upload routes

// Initialize database and start server
const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully');
    
    console.log('Setting up model associations...');
    // Setup model associations
    setupAssociations();
    console.log('Model associations established');
    
    // Sync database models
    await sequelize.sync({ force: false });
    console.log('✅ Database synced successfully');
    
    // Start server
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();