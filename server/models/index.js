import User from './User.js';
import { sequelize } from '../config/database.js';

// Add any relationships between models here
// Example: User.hasMany(Posts);

// Sync all models with the database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database models synchronized');
  } catch (error) {
    console.error('Error synchronizing database models:', error);
  }
};

export { 
  User,
  syncDatabase 
}; 