
import express from 'express';
import {
  createProfile,
  getProfile,
  updateProfile
} from '../controllers/profileController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Anyone can try to create a profile (assumes they send userId manually)
router.post("/profile", createProfile);

// GET and PATCH require a valid token
router.get("/profile", authMiddleware, getProfile);
router.patch("/profile", authMiddleware, updateProfile);

export default router;