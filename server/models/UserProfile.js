import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import User from './User.js';

const UserProfile = sequelize.define('UserProfile', {
  // Basic profile info
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true
  },
  avatar_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  
  // Professional info
  job_title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  company: {
    type: DataTypes.STRING,
    allowNull: true
  },
  
  // Preferences
  interests: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  skills: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  
  // Onboarding status
  onboarding_completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  onboarding_step: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
});

// Define the relation - a User has one UserProfile
User.hasOne(UserProfile);
UserProfile.belongsTo(User);

export default UserProfile; 