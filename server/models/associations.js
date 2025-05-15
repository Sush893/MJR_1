import User from './user_data.js'
import Profile from './profile.js';
import Project from './projects.js';
import { Projector } from 'lucide-react';

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
  
  console.log('Model associations established');
};

export default setupAssociations;
