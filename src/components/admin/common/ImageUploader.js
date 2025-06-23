import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';

/**
 * A reusable image uploader component
 * @param {Object} props - Component props
 * @param {string} props.currentImage - The current image URL
 * @param {Function} props.onImageUpload - Callback function when image is uploaded
 * @param {Function} props.onImageSelect - Callback function when image is selected but not yet uploaded
 * @param {string} props.folder - The folder to upload the image to (default: 'uploads')
 * @param {string} props.placeholderImage - The placeholder image URL
 * @param {string} props.label - The label for the uploader
 * @param {boolean} props.showPreview - Whether to show the image preview
 * @param {Object} props.previewStyle - Custom styles for the preview container
 * @param {boolean} props.uploadOnSelect - Whether to upload the image immediately on selection (default: false)
 * @param {string} props.imageRatio - Recommended image ratio (e.g., '16:9', '1:1')
 * @param {string} props.helpText - Additional help text to display
 */
const ImageUploader = forwardRef(({
  currentImage,
  onImageUpload,
  onImageSelect,
  folder = 'uploads',
  placeholderImage = '',
  label = 'Upload Image',
  showPreview = true,
  previewStyle = {},
  className = '',
  uploadOnSelect = false,
  imageRatio = '',
  helpText = '',
}, ref) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewImage, setPreviewImage] = useState(currentImage || placeholderImage);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setPreviewImage(currentImage || placeholderImage);
  }, [currentImage, placeholderImage]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please select a valid image file (JPEG, PNG, GIF, WEBP, SVG)');
      return;
    }
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error('Image size should be less than 5MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target.result);
    };
    reader.readAsDataURL(file);
    setSelectedFile(file);
    if (onImageSelect) onImageSelect(file);
  };

  const uploadImage = useCallback(async (file) => {
    if (!file) file = selectedFile;
    if (!file) {
      toast.error('No file selected');
      return;
    }
    setUploading(true);
    setProgress(0);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('directory', `images/${folder}`);
      const response = await fetch('/api/upload/image?folder=' + folder, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload image');
      }
      const data = await response.json();
      const imageUrl = data.url || data.secure_url;
      setPreviewImage(imageUrl);
      setSelectedFile(null);
      if (onImageUpload) onImageUpload(imageUrl);
      toast.success('Image uploaded successfully');
      return imageUrl;
    } catch (error) {
      toast.error(error.message || 'Failed to upload image');
      setPreviewImage(currentImage || placeholderImage);
      return null;
    } finally {
      setUploading(false);
      setProgress(100);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setTimeout(() => setProgress(0), 1000);
    }
  }, [selectedFile, folder, currentImage, placeholderImage, onImageUpload]);

  React.useImperativeHandle(ref, () => ({
    uploadImage: () => uploadImage(selectedFile),
    hasSelectedFile: () => !!selectedFile
  }), [selectedFile, uploadImage]);

  return (
    <div className={`image-uploader ${className}`}>
      {showPreview && (
        <div className="image-uploader__preview" style={previewStyle} onClick={() => fileInputRef.current && fileInputRef.current.click()}>
          <Image
            src={previewImage}
            alt="Preview"
            className="image-uploader__preview-img"
            width={300}
            height={150}
            style={{ objectFit: "contain", maxWidth: "100%", maxHeight: "100%" }}
            unoptimized={true}
            onError={() => setPreviewImage(placeholderImage)}
          />
          {uploading && (
            <div className="image-uploader__progress-overlay">
              <div className="image-uploader__progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
          )}
          {selectedFile && !uploadOnSelect && (
            <div className="image-uploader__selected-indicator">
              <span>Image selected (not uploaded yet)</span>
            </div>
          )}
        </div>
      )}
      <label className="image-uploader__label">{label}</label>
      <div className="image-uploader__buttons">
        <button type="button" className="image-uploader__browse-button" onClick={() => fileInputRef.current && fileInputRef.current.click()} disabled={uploading}>
          {uploading ? 'Uploading...' : 'Browse'}
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={uploadOnSelect ? (e) => { handleFileSelect(e); uploadImage(e.target.files[0]); } : handleFileSelect}
          className="image-uploader__input"
          accept="image/*"
          disabled={uploading}
        />
      </div>
      <div className="image-uploader__help-text">
        <p>Accepted formats: JPEG, PNG, GIF, WEBP, SVG (max 5MB)</p>
        {imageRatio && <p>Recommended ratio: {imageRatio}</p>}
        {helpText && <p>{helpText}</p>}
      </div>
    </div>
  );
});

ImageUploader.displayName = 'ImageUploader';

export default ImageUploader;
