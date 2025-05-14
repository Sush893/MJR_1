import User from './user_data.js'
import Profile from './profile.js';

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
  
  console.log('Model associations established');
};

export default setupAssociations;
