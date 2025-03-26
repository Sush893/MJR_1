import React, { useState } from 'react';
import { X, Upload, Link as LinkIcon } from 'lucide-react';

interface ImageSelectModalProps {
  type: 'avatar' | 'background';
  onSelect: (imageUrl: string) => void;
  onClose: () => void;
}

const defaultImages = {
  avatar: [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
  ],
  background: [
    'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=1200'
  ]
};

export function ImageSelectModal({ type, onSelect, onClose }: ImageSelectModalProps) {
  const [customUrl, setCustomUrl] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedImage) {
      onSelect(selectedImage);
    } else if (customUrl) {
      onSelect(customUrl);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold dark:text-white">
            Select {type === 'avatar' ? 'Profile Picture' : 'Background Image'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Default Images */}
          <div>
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Choose from Default Images</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {defaultImages[type].map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === image
                      ? 'border-primary-500 ring-2 ring-primary-500 ring-offset-2'
                      : 'border-gray-200 dark:border-gray-700 hover:border-primary-500'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Default ${type} ${index + 1}`}
                    className={`w-full h-full object-cover ${
                      type === 'avatar' ? 'object-center' : 'object-cover'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Custom URL Input */}
          <div>
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Or Use Custom URL</h3>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="url"
                  value={customUrl}
                  onChange={(e) => {
                    setCustomUrl(e.target.value);
                    setSelectedImage(null);
                  }}
                  placeholder="Enter image URL"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedImage && !customUrl}
            className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Select Image
          </button>
        </div>
      </div>
    </div>
  );
}