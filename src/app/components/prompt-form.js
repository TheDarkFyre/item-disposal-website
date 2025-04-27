'use client';
import { useRef, useState } from 'react';
import styles from './prompt-form.module.css';

export default function PromptForm({ onSubmit, loading }) {
  const fileInputRef = useRef(null);
  const [previewSrc, setPreviewSrc] = useState(null);

  // Generate a preview when the user selects an image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreviewSrc(reader.result);
    reader.readAsDataURL(file);
  };

  // Send the image file to the API
  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = fileInputRef.current.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch('/api/chatgpt', {
      method: 'POST',
      body: formData,
    });
    const json = await res.json();
    onSubmit(json.choices || json);
    setPreviewSrc(null);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.promptForm}>
      <div
        className={styles.uploadBox}
        onClick={() => fileInputRef.current.click()}
      >
        {previewSrc ? (
          <img src={previewSrc} alt="Preview" className={styles.previewImage} />
        ) : (
          <span className={styles.placeholderText}>Click to select an image</span>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.fileInput}
        />
      </div>

      <button
        type="submit"
        disabled={loading || !previewSrc}
        className={styles.uploadButton}
      >
        {loading ? 'Analyzing...' : 'Analyze Image'}
      </button>
    </form>
  );
}
