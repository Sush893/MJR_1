import React, { useState, useRef } from 'react';
import { X, Upload, Image, Video, Plus } from 'lucide-react';
import axios from 'axios';

interface PitchEditorProps {
  onSave: (formData: FormData) => void;
  onClose: () => void;
}

export function PitchEditor({ onSave, onClose }: PitchEditorProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [media_type, setMediaType] = useState<'image' | 'video'>('image');
  const [media_url, setMediaUrl] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleFileUpload = async (file: File) => {
    try {
      // Check file size (100MB limit)
      if (file.size > 100 * 1024 * 1024) {
        throw new Error('File size exceeds 100MB limit');
      }

      setUploading(true);
      setUploadProgress(0);
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:3000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
          setUploadProgress(percentCompleted);
        },
      });

      setMediaUrl(response.data.url);
    } catch (error: any) {
      console.error('Error uploading file:', error);
      let errorMessage = 'Failed to upload file. Please try again.';
      
      if (error.message === 'File size exceeds 100MB limit') {
        errorMessage = 'File size exceeds 100MB limit. Please choose a smaller file.';
      } else if (error.response?.data) {
        // Handle different types of error responses
        if (typeof error.response.data === 'string') {
          const match = error.response.data.match(/Error: ([^<]+)/);
          if (match) {
            errorMessage = match[1];
          }
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.data.error) {
          errorMessage = error.response.data.error;
        }
      }
      
      alert(errorMessage);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileType = file.type.split('/')[0];
      if (fileType !== media_type) {
        alert(`Please select a ${media_type} file.`);
        return;
      }
      handleFileUpload(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('media_type', media_type);
    formData.append('media_url', media_url);
    formData.append('tags', JSON.stringify(tags));

    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold dark:text-white">Create New Pitch</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              placeholder="Enter your pitch title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              placeholder="Describe your pitch..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Media
            </label>
            <div className="flex gap-4 mb-4">
              <button
                type="button"
                onClick={() => {
                  setMediaType('image');
                  setMediaUrl('');
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  media_type === 'image' 
                    ? 'bg-primary-50 dark:bg-primary-900/30 border-primary-500 text-primary-700 dark:text-primary-300' 
                    : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <Image className="w-5 h-5" />
                Image
              </button>
              <button
                type="button"
                onClick={() => {
                  setMediaType('video');
                  setMediaUrl('');
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  media_type === 'video' 
                    ? 'bg-primary-50 dark:bg-primary-900/30 border-primary-500 text-primary-700 dark:text-primary-300' 
                    : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <Video className="w-5 h-5" />
                Video
              </button>
            </div>
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept={media_type === 'image' ? 'image/*' : 'video/*'}
              className="hidden"
            />

            <div className="flex gap-2 mb-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50"
                disabled={uploading}
              >
                <Upload className="w-5 h-5" />
                {uploading ? `Uploading ${uploadProgress}%` : 'Upload File'}
              </button>
            </div>

            {uploading && (
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div 
                    className="bg-primary-500 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {uploadProgress}% uploaded
                </p>
              </div>
            )}

            {media_url && (
              <div className="mb-4">
                {media_type === 'image' ? (
                  <img src={media_url} alt="Uploaded preview" className="max-h-48 rounded-lg" />
                ) : (
                  <video src={media_url} controls className="max-h-48 rounded-lg" />
                )}
              </div>
            )}

            <input
              type="url"
              value={media_url}
              onChange={(e) => setMediaUrl(e.target.value)}
              placeholder={`Or enter ${media_type} URL`}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-primary-900 dark:hover:text-primary-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                placeholder="Add tags..."
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="p-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            >
              Create Pitch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}