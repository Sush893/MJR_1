import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user_data.js';

const Profile = sequelize.define('Profile', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  industry: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  avatar_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  job_title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  interests: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  skills: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  communities: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  recommended_matches: {
    type: DataTypes.JSONB,
    defaultValue: [],
  },
  blogs: {
    type: DataTypes.JSONB,
    defaultValue: [],
  },
  onboarding_completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  onboarding_step: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
}, {
  tableName: 'profiles',
  timestamps: true,
});

// Define associations
User.hasOne(Profile, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Profile.belongsTo(User, { foreignKey: 'user_id' });

export default Profile;
