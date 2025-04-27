"use client";

import { useState, useRef } from "react";
import styles from "./prompt-form.module.css";

export default function PromptForm({ onSubmit, isLoading }) {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;
    onSubmit(file);
    setFile(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={styles.input}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
      >
        {file ? file.name : "Drag & drop an image here, or click to browse"}
      </div>

      <input
        type="file"
        accept="image/*"
        capture="user"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) => {
          if (e.target.files?.[0]) setFile(e.target.files[0]);
        }}
      />

      <input
        className={styles.submitButton}
        type="submit"
        disabled={isLoading || !file}
        value={isLoading ? "Uploading…" : "Submit"}
      />
    </form>
  );
}
