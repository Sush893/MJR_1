import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user_data.js';
import { createProject , getProjectsByUser , updateProject , deleteProject } from '../controllers/projectController.js';

const router = express.Router();

// Create Project
router.post('/createProject',createProject );
router.get('/projects/:user_id', getProjectsByUser); // get all
router.put('/projects/:user_id/:projectId', updateProject); // update
router.delete('/projects/:user_id/:projectId', deleteProject); // delete



export default router;
