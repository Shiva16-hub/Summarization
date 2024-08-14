import React, { useState } from 'react';
import axios from '../api'; // Make sure this path is correct
import './FileUpload.css'; // Import the CSS file

function FileUpload() {
    const [file, setFile] = useState(null);
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError("Please select a file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        setLoading(true);
        setError("");

        try {
            const response = await axios.post("http://localhost:8000/upload", formData);
            setSummary(response.data.summary || "No summary available.");
        } catch (error) {
            setError("An error occurred while uploading the file.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="file-upload-container" mt-5>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit" disabled={loading}>
                    {loading ? 'Uploading...' : 'Upload'}
                </button>
            </form>
            {error && <div className="error-message">{error}</div>}
            {summary && (
                <div className="summary-container">
                    <h3>Summary:</h3>
                    <p>{summary}</p>
                </div>
            )}
        </div>
    );
}

export default FileUpload;
