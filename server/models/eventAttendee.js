import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const EventAttendee = sequelize.define('EventAttendee', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  event_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'events',
      key: 'id'
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM('attending', 'maybe', 'declined'),
    allowNull: false,
    defaultValue: 'attending'
  }
}, {
  timestamps: true,
  tableName: 'event_attendees'
});

export default EventAttendee;