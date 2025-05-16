import Event from '../models/event.js';
import EventAttendee from '../models/eventAttendee.js';

export const createEvent = async (req, res) => {
  try {
    const {
      creator_id,
      title,
      description,
      event_type,
      date,
      start_time,
      end_time,
      location_type,
      location_url,
      location_address,
      location_coordinates
    } = req.body;

    // Validate required fields
    if (!creator_id || !title || !date) {
      return res.status(400).json({ message: "creator_id, title and date are required" });
    }

    // Create the event
    const newEvent = await Event.create({
      creator_id,
      title,
      description,
      event_type,
      date,
      start_time,
      end_time,
      location_type,
      location_url,
      location_address,
      location_coordinates
    });

    return res.status(201).json({
      message: "Event created successfully",
      event: newEvent
    });
  } catch (error) {
    console.error("Error creating event:", error);
    return res.status(500).json({
      message: "Error creating event",
      error: error.message
    });
  }
};

export const getEventsByUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { date } = req.query;

    let whereClause = { creator_id: user_id };
    if (date) {
      whereClause.date = date;
    }

    const events = await Event.findAll({
      where: whereClause,
      include: [{
        model: EventAttendee,
        as: 'attendees',
        include: ['user']
      }],
      order: [['date', 'ASC']]
    });

    return res.status(200).json({ events });
  } catch (error) {
    console.error("Error fetching events:", error);
    return res.status(500).json({
      message: "Error fetching events",
      error: error.message
    });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { user_id, event_id } = req.params;
    const updates = req.body;

    const event = await Event.findOne({
      where: { id: event_id, creator_id: user_id }
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await event.update(updates);

    return res.status(200).json({
      message: "Event updated successfully",
      event
    });
  } catch (error) {
    console.error("Error updating event:", error);
    return res.status(500).json({
      message: "Error updating event",
      error: error.message
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { user_id, event_id } = req.params;

    const event = await Event.findOne({
      where: { id: event_id, creator_id: user_id }
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await event.destroy();

    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    return res.status(500).json({
      message: "Error deleting event",
      error: error.message
    });
  }
};

export const attendEvent = async (req, res) => {
  try {
    const { event_id } = req.params;
    const { user_id, status } = req.body;

    if (!user_id || !status) {
      return res.status(400).json({ message: "user_id and status are required" });
    }

    const attendance = await EventAttendee.upsert({
      event_id,
      user_id,
      status
    });

    return res.status(200).json({
      message: "Event attendance updated successfully",
      attendance
    });
  } catch (error) {
    console.error("Error updating event attendance:", error);
    return res.status(500).json({
      message: "Error updating event attendance",
      error: error.message
    });
  }
}; 