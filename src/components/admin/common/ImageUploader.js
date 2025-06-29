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
  oldPublicId = '', // Public ID of the old image to delete when replacing
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
    console.log('File selected:', e.target.files[0]);
    const file = e.target.files[0];
    if (!file) {
      console.log('No file selected');
      return;
    }
    
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      console.error('Invalid file type:', file.type);
      toast.error('Please select a valid image file (JPEG, PNG, GIF, WEBP, SVG)');
      return;
    }
    
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      console.error('File too large:', file.size);
      toast.error('Image size should be less than 5MB');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log('File preview generated');
      setPreviewImage(e.target.result);
    };
    reader.readAsDataURL(file);
    setSelectedFile(file);
    console.log('Calling onImageSelect with file');
    if (onImageSelect) onImageSelect(file);
    
    // If auto-upload is enabled, start the upload
    if (uploadOnSelect) {
      console.log('Auto-uploading image...');
      uploadImage(file);
    }
  };

  const uploadImage = useCallback(async (fileToUpload = null) => {
    const file = fileToUpload || selectedFile;
    if (!file) {
      console.error('No file to upload');
      toast.error('No file selected');
      return null;
    }
    
    console.log('Starting upload for file:', file.name);
    setUploading(true);
    setProgress(0);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      // Include upload parameters
      const params = new URLSearchParams();
      params.append('folder', folder);
      
      // Add old public ID if provided for replacement
      if (oldPublicId) {
        console.log('Including old public ID for replacement:', oldPublicId);
        params.append('oldPublicId', oldPublicId);
      }

      console.log('Uploading to folder:', folder);
      console.log('Request params:', params.toString());
      
      const response = await fetch(`/api/upload/image?${params.toString()}`, {
        method: 'POST',
        body: formData,
      });
      
      console.log('Upload response status:', response.status);
      
      if (!response.ok) {
        let errorMessage = 'Failed to upload image';
        try {
          const errorData = await response.json();
          console.error('Upload error response:', errorData);
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          console.error('Error parsing error response:', e);
        }
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      console.log('Upload successful, response:', data);
      
      // Handle different response formats from the API
      const imageUrl = data.path || data.url || data.secure_url || data.filePath;
      const publicId = data.public_id || data.publicId;
      
      if (!imageUrl) {
        console.error('No image URL found in response:', data);
        throw new Error('No image URL returned from server');
      }
      
      console.log('Uploaded image URL:', imageUrl);
      console.log('Public ID:', publicId);
      
      // Update the preview
      setPreviewImage(imageUrl);
      setSelectedFile(null);
      
      // Notify parent component about the upload
      if (onImageUpload) {
        onImageUpload(imageUrl, publicId);
      }
      
      toast.success('Image uploaded successfully');
      return { url: imageUrl, publicId };
      
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to upload image');
      setPreviewImage(currentImage || placeholderImage);
      return null;
    } finally {
      setUploading(false);
      setProgress(100);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setTimeout(() => setProgress(0), 1000);
    }
  }, [selectedFile, folder, currentImage, placeholderImage, onImageUpload, oldPublicId]);

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
