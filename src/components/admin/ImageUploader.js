import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const ImageUploader = ({
  currentImage,
  onImageChange,
  directory = 'uploads',
  label = 'Image',
  width = 200,
  height = 150,
  className = '',
  imageClassName = '',
  allowUrl = true,
  id = '',
  recommendedSize = '',
  imageTypes = 'JPEG, PNG, GIF, WEBP'
}) => {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(currentImage || '');
  const [error, setError] = useState('');
  const [inputId] = useState(`file-upload-${id || label.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`);

  useEffect(() => {
    setImageUrl(currentImage || '');
  }, [currentImage]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('directory', directory);
      const response = await fetch(`/api/upload/image?folder=${directory}`, {
        method: 'POST',
        body: formData
      });
      if (!response.ok) throw new Error('Failed to upload image');
      const result = await response.json();
      const newImageUrl = result.url || result.secure_url;
      setImageUrl(newImageUrl);
      onImageChange(newImageUrl);
    } catch (error) {
      setError('Failed to upload image. ' + (error.message || ''));
    } finally {
      setUploading(false);
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    onImageChange(url);
  };

  return (
    <div className={`admin-page__image-uploader ${className}`}>
      <label className="admin-page__label">{label}</label>
      <div className="admin-page__image-preview-container">
        {imageUrl ? (
          <div className="admin-page__image-container">
            <Image
              src={imageUrl}
              alt={label}
              className={`admin-page__preview-image ${imageClassName}`}
              width={width}
              height={height}
              style={{ objectFit: "contain", maxWidth: "100%" }}
              unoptimized={imageUrl.startsWith('http') || imageUrl.includes('?')}
            />
          </div>
        ) : (
          <div className="admin-page__image-placeholder" style={{ width: `${width}px`, height: `${height}px` }}>
            <i className="fa-solid fa-image"></i>
            <span>No Image</span>
          </div>
        )}
      </div>
      <div className="admin-page__file-upload">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="admin-page__file-input"
          id={inputId}
          disabled={uploading}
        />
        <label htmlFor={inputId} className="admin-page__file-label">
          <i className="fa-solid fa-upload"></i>
          {uploading ? 'Uploading...' : 'Upload Image'}
        </label>
      </div>
      {allowUrl && (
        <div className="admin-page__url-input">
          <label className="admin-page__small-label">Or enter image URL:</label>
          <input
            type="text"
            value={imageUrl}
            onChange={handleUrlChange}
            placeholder="https://res.cloudinary.com/your-cloud/image/upload/..."
            className="admin-page__input"
            disabled={uploading}
          />
        </div>
      )}
      {(recommendedSize || imageTypes) && (
        <div className="admin-page__image-help">
          {recommendedSize && <p className="admin-page__help-text"><strong>Recommended size:</strong> {recommendedSize}</p>}
          <p className="admin-page__help-text"><strong>Image types:</strong> {imageTypes}</p>
        </div>
      )}
      {error && <div className="admin-page__error-message">{error}</div>}
    </div>
  );
};

export default ImageUploader;
