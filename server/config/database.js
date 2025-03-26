import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const encodedDbUrl = encodeURI(process.env.DB_URL);

export const sequelize = new Sequelize(encodedDbUrl, {
  dialect: "postgres",
  logging: false,
  define: {
    freezeTableName: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully!");
    await sequelize.sync();
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};
