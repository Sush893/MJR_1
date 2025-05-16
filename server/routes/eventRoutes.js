import express from 'express';
import { 
  createEvent,
  getEventsByUser,
  updateEvent,
  deleteEvent,
  attendEvent
} from '../controllers/eventController.js';

const router = express.Router();

// Event routes
router.post('/createEvent', createEvent);
router.get('/events/:user_id', getEventsByUser);
router.put('/events/:user_id/:event_id', updateEvent);
router.delete('/events/:user_id/:event_id', deleteEvent);
router.post('/events/:event_id/attend', attendEvent);

export default router; 