import api from './client';

export const ProfileAPI = {
  getProfile: () => api.get('/profile'),
  
  updateProfile: (data: Partial<Profile>) => api.patch('/profile', data),
  
  uploadAvatar: (file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return api.post('/profile/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};