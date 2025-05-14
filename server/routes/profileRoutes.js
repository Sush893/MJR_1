import express from 'express';
import { protect } from '../middleware/auth.js';
import Profile from '../models/profile.js';
import User from '../models/user_data.js';

const router = express.Router();

// Get current user profile
router.get('/profile', protect, async (req, res) => {
  try {
    console.log('📋 PROFILE: Getting profile for user ID:', req.user.id);
    
    // Find profile for the authenticated user
    let profile = await Profile.findOne({
      where: { user_id: req.user.id }
    });
    
    if (!profile) {
      // If profile doesn't exist, create a default one
      console.log('📋 PROFILE: No profile found, creating default profile');
      profile = await Profile.create({
        user_id: req.user.id,
        bio: '',
        location: '',
        avatar_url: '',
        interests: [],
        onboarding_completed: false
      });
    }
    
    // Get user data (excluding password)
    const user = await User.findOne({
      where: { id: req.user.id },
      attributes: { exclude: ['password'] }
    });
    
    console.log('✅ PROFILE: Successfully fetched profile');
    res.json({
      user,
      profile
    });
  } catch (error) {
    console.error('❌ PROFILE ERROR:', error);
    res.status(500).json({ error: 'Error fetching profile' });
  }
});

// Create a new profile 
router.post('/profile', protect, async (req, res) => {
  try {
    console.log('📋 PROFILE: Creating profile for user ID:', req.user.id);
    
    // Check if profile already exists
    let profile = await Profile.findOne({
      where: { user_id: req.user.id }
    });
    
    if (profile) {
      console.log('📋 PROFILE: Profile already exists, updating instead');
      await profile.update(req.body);
    } else {
      // Create new profile
      profile = await Profile.create({
        user_id: req.user.id,
        ...req.body
      });
    }
    
    console.log('✅ PROFILE: Successfully created/updated profile');
    res.status(201).json(profile);
  } catch (error) {
    console.error('❌ PROFILE ERROR:', error);
    res.status(500).json({ error: 'Error creating profile' });
  }
});

// Update user profile (supports both PUT and PATCH)
router.put('/profile', protect, updateProfileHandler);
router.patch('/profile', protect, updateProfileHandler);

// Handler function for profile updates
async function updateProfileHandler(req, res) {
  try {
    console.log('📋 PROFILE: Updating profile for user ID:', req.user.id);
    
    // Find or create profile
    let profile = await Profile.findOne({
      where: { user_id: req.user.id }
    });
    
    if (!profile) {
      profile = await Profile.create({
        user_id: req.user.id,
        ...req.body
      });
    } else {
      // Update profile with request data
      await profile.update(req.body);
    }
    
    console.log('✅ PROFILE: Successfully updated profile');
    res.json(profile);
  } catch (error) {
    console.error('❌ PROFILE ERROR:', error);
    res.status(500).json({ error: 'Error updating profile' });
  }
}

// Complete onboarding (supports both PUT and PATCH)
router.put('/profile/complete-onboarding', protect, completeOnboardingHandler);
router.patch('/profile/complete-onboarding', protect, completeOnboardingHandler);

// Handler function for completing onboarding
async function completeOnboardingHandler(req, res) {
  try {
    console.log('📋 PROFILE: Completing onboarding for user ID:', req.user.id);
    
    // Find profile
    let profile = await Profile.findOne({
      where: { user_id: req.user.id }
    });
    
    if (!profile) {
      profile = await Profile.create({
        user_id: req.user.id,
        onboarding_completed: true
      });
    } else {
      // Update onboarding status
      await profile.update({ onboarding_completed: true });
    }
    
    console.log('✅ PROFILE: Onboarding completed');
    res.json({
      message: 'Onboarding completed successfully',
      profile
    });
  } catch (error) {
    console.error('❌ PROFILE ERROR:', error);
    res.status(500).json({ error: 'Error completing onboarding' });
  }
}

export default router;