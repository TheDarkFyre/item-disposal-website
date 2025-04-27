import { useState, useRef } from "react";
import styles from "./prompt-form.module.css";

export default function PromptForm({ onSubmit, isLoading }) {
    const [file, setFile] = useState(null);
    const fileInputRef = useRef();

    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
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
            <label>Upload an image of your item</label>

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
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={(e) => {
                    if (e.target.files[0]) setFile(e.target.files[0]);
                }}
            />

            <input
                className={styles.submitButton}
                type="submit"
                disabled={isLoading || !file}
            />
        </form>
    );
}
