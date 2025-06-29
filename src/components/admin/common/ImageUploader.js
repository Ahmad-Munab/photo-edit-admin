import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';

const ImageUploader = ({
  currentImage = '',
  onImageUpload,
  folder = 'uploads',
  label = 'Upload Image',
  className = ''
}) => {
  const [preview, setPreview] = useState(currentImage);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Simple validation
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);

    // Upload the file
    await uploadFile(file);
  };

  const uploadFile = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    try {
      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      const imageUrl = data.path || data.url || data.secure_url;
      
      if (imageUrl && onImageUpload) {
        onImageUpload(imageUrl, data.public_id);
        toast.success('Image uploaded successfully');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
      setPreview(currentImage);
    } finally {
      setUploading(false);
    }
  };

  // Check if preview is a valid URL or data URL
  const isValidImage = preview && 
    (typeof preview === 'string') && 
    (preview.startsWith('http') || preview.startsWith('data:image') || preview.startsWith('/'));

  return (
    <div className={`simple-uploader ${className}`}>
      <div className="preview-container" onClick={() => fileInputRef.current?.click()}>
        {isValidImage ? (
          <Image 
            src={preview} 
            alt="Preview" 
            className="preview-image"
            width={200}
            height={150}
            style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}
            onError={(e) => {
              console.error('Error loading image:', preview);
              e.target.src = '/images/placeholder.png';
            }}
          />
        ) : (
          <div className="empty-preview">
            <span>Click to upload image</span>
          </div>
        )}
        {uploading && <div className="uploading-overlay">Uploading...</div>}
      </div>
      
      <div className="upload-controls">
        <button 
          type="button" 
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="browse-button"
        >
          {uploading ? 'Uploading...' : 'Choose File'}
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*"
          style={{ display: 'none' }}
          disabled={uploading}
        />
      </div>

      <style jsx>{`
        .simple-uploader {
          margin: 10px 0;
        }
        .preview-container {
          width: 100%;
          height: 200px;
          border: 2px dashed #ddd;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
          background: #f9f9f9;
          cursor: pointer;
          margin-bottom: 10px;
        }
        .empty-preview {
          color: #666;
          text-align: center;
          padding: 20px;
        }
        .preview-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        .uploading-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .browse-button {
          padding: 8px 16px;
          background: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .browse-button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default ImageUploader;
