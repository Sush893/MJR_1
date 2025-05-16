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
  origin: '*', // For development - replace with your frontend URL in production
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));
app.use(express.json());

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

// Setup routes
app.use('/api', authRoutes);
app.use('/api', profileRoutes);
app.use('/api', pitchRoutes);
app.use('/api', projectRoutes);
app.use('/api', eventRoutes);

// Initialize database and start server
const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully');
    
    // Setup model associations
    setupAssociations();
    
    // Sync database models
    await sequelize.sync({ alter: true });
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