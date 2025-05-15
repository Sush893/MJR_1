import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import User from "./user_data.js";


const Project = sequelize.define('Project', {
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
  Description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      isIn: {
        args: [[1, 2, 3]],
        msg: 'Status must be 1, 2, or 3',
      },
    },
  },
}, {
  tableName: 'projects', // <- outside the column definitions
  timestamps: true,      // <- outside the column definitions
});


// Define associations
User.hasMany(Project, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Project.belongsTo(User, { foreignKey: 'user_id' });

export default Project;
