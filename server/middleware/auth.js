import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access Denied, No Token Provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(e);
  } catch (error) {
    res.status(403).json({ message: "Invalid Token" });
  }
};
