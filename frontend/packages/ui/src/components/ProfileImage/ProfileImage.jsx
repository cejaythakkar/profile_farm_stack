import React, { useState, useRef, useEffect } from 'react';
import './ProfileImage.css';

export default function ProfileImage({
  userName = 'John Doe',
  setFieldValue,
  name,
  profileImageURL,
}) {
  
  const [imageSrc, setImageSrc] = useState(profileImageURL || null);
  const fileInputRef = useRef(null);
  useEffect(() => {
    if (profileImageURL) {
      setImageSrc(`${profileImageURL}?t=${new Date().getTime()}`);
    }
  }, [profileImageURL]);
  // Extract initials if no image is uploaded
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Handle image file selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFieldValue(name, file);
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result); // Base64 string for immediate preview
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file browser click
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="profile-container">
      <div className="avatar-wrapper" onClick={triggerFileInput}>
        {imageSrc ? (
          <img src={imageSrc} alt={userName} className="profile-img" />
        ) : (
          <div className="profile-fallback">{getInitials(userName)}</div>
        )}
        <div className="avatar-overlay">
          <span>Change</span>
        </div>
      </div>

      <input
        id={name}
        name={name}
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
    </div>
  );
}
