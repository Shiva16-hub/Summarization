import React, { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/upload/', { // FastAPI endpoint
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      setSummary(result.summary);
    } catch (error) {
      console.error('Error:', error);
      setSummary('Failed to summarize the document.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Lepide Solutions</h1>
      </header>
      <h2 className='text-3xl text-white text-center leading-10 font-semibold'>
            Summarize with
            <br />
            <span className='text-5xl font-bold text-cyan-500'>OpenAI GPT</span>
          </h2>
        
      <main>
        <form onSubmit={handleSubmit} className="file-upload">
          <label htmlFor="file-input" className="upload-label">
            Choose File
          </label>
          <input type="file" id="file-input" onChange={handleFileChange} />
          <button type="submit" disabled={!file || loading} className="submit-button">
            {loading ? 'Summarizing...' : 'Upload and Summarize'}
          </button>
        </form>
        {summary && (
          <div className="summary-box">
            <h2>Summary:</h2>
            <div
          className='flex flex-col items-center justify-center
        mt-4 p-4'
        >
        </div>
            <p>{summary}</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
