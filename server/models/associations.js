import User from './user_data.js'
import Profile from './profile.js';
import Project from './projects.js';
import { Projector } from 'lucide-react';
import Event from './event.js';
import EventAttendee from './eventAttendee.js';

const setupAssociations = () => {
  console.log('Setting up model associations...');
  
  // User and Profile
  User.hasOne(Profile, { 
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
  Profile.belongsTo(User, { 
    foreignKey: 'user_id' 
  });

  //User and Projects
  User.hasMany(Project, { 
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
  Project.belongsTo(User, { 
    foreignKey: 'user_id' 
  });
  
  // Event associations
  Event.belongsTo(User, { foreignKey: 'creator_id', as: 'creator' });
  Event.hasMany(EventAttendee, { foreignKey: 'event_id', as: 'attendees' });

  // EventAttendee associations
  EventAttendee.belongsTo(Event, { foreignKey: 'event_id' });
  EventAttendee.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

  // User associations with events
  User.hasMany(Event, { foreignKey: 'creator_id', as: 'createdEvents' });
  User.hasMany(EventAttendee, { foreignKey: 'user_id', as: 'eventAttendances' });
  
  console.log('Model associations established');
};

export default setupAssociations;
