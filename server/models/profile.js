import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Profile = sequelize.define('Profile', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true
  },
  interests: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  active_projects: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  communities: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  }
}, {
  tableName: 'profiles',
  timestamps: true
});

(async () => {
    try {
      await sequelize.sync();
      console.log('Profile table is ready.');
    } catch (err) {
      console.error('Error creating User table:', err);
    }
  })();

export default Profile;
