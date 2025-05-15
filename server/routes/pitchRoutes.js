import express from 'express';
import Pitch from '../models/pitch.js';
import { createPitch , getPitchesByUser, 
    updatePitch, 
    deletePitch } from '../controllers/pitchController.js';

const router = express.Router();

// create Pitch
router.post('/createPitch', createPitch);
router.get('/pitches/:user_id', getPitchesByUser);
router.put('/updatePitch/:user_id/:pitch_id', updatePitch);
router.delete('/deletePitch/:user_id/:pitch_id', deletePitch);


export default router;