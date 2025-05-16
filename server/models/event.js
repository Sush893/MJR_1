import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user_data.js';

const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  creator_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  event_type: {
    type: DataTypes.STRING,
    allowNull: true
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  start_time: {
    type: DataTypes.TIME,
    allowNull: true
  },
  end_time: {
    type: DataTypes.TIME,
    allowNull: true
  },
  location_type: {
    type: DataTypes.STRING,
    allowNull: true
  },
  location_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  location_address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  location_coordinates: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: 'events'
});

// We'll set up associations after all models are defined
export default Event;