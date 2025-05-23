import Profile from "../models/profile.js";

export const createProfile = async (req, res) => {
  try {
    const {
      userId,
      first_name,
      last_name,
      avatar_url,
      industry,
      role,
      role_details,
      bio,
      location,
      interests,
      active_projects,
      communities,
      recommended_matches,
      blogs,
      onboarding_completed
    } = req.body;

    const existingProfile = await Profile.findOne({ userId });

    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Profile already exists for this user",
        data: existingProfile
      });
    }

    const userProfile = await Profile.create({
      userId,
      first_name,
      last_name,
      avatar_url,
      industry,
      role,
      role_details,
      bio,
      location,
      interests,
      active_projects,
      communities: communities || [],
      recommended_matches: recommended_matches || [],
      blogs: blogs || [],
      onboarding_completed
    });

    return res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: userProfile
    });

  } catch (error) {
    console.error("Internal server error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await Profile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found"
      });
    }

    // Transform the data to match the frontend expected format
    const transformedProfile = {
      ...profile.toJSON(),
      recommendedMatches: profile.recommended_matches || [],
      communities: profile.communities || [],
      blogs: profile.blogs || []
    };

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: transformedProfile
    });

  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body;

    const profile = await Profile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found"
      });
    }

    // Update the profile with new data
    const updatedProfile = await profile.update({
      ...updates,
      communities: updates.communities || profile.communities || [],
      recommended_matches: updates.recommended_matches || profile.recommended_matches || [],
      blogs: updates.blogs || profile.blogs || []
    });

    // Transform the data to match the frontend expected format
    const transformedProfile = {
      ...updatedProfile.toJSON(),
      recommendedMatches: updatedProfile.recommended_matches || [],
      communities: updatedProfile.communities || [],
      blogs: updatedProfile.blogs || []
    };

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: transformedProfile
    });

  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

export const uploadAvatar = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    const avatar_url = `/uploads/avatars/${req.file.filename}`;

    const profile = await Profile.findOneAndUpdate(
      { userId },
      { $set: { avatar_url } },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Avatar uploaded successfully",
      data: {
        avatar_url,
        profile
      }
    });

  } catch (error) {
    console.error("Error uploading avatar:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};
