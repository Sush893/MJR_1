import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import User from "./user_data.js";

const Pitch = sequelize.define('Pitch', {
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
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  media_type: {
    type: DataTypes.STRING, // e.g., 'image', 'video'
    allowNull: true,
  },
  media_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  comments: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: 'pitches',
  timestamps: true, // createdAt and updatedAt
});

// Associations
User.hasMany(Pitch, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Pitch.belongsTo(User, { foreignKey: 'user_id' });
console.log('User-Pitch association established');
console.log('Pitch-User association established');

export default Pitch;
