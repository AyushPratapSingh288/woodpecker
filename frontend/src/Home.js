import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadResponse, setUploadResponse] = useState('');
  const [pdfUploaded, setPdfUploaded] = useState(false);
  const [stringInput, setStringInput] = useState('');
  const [stringResponse, setStringResponse] = useState('');
  const [pastRequests, setPastRequests] = useState([]);

  useEffect(() => {
    const savedRequests = localStorage.getItem('pdfUploaderRequests');
    if (savedRequests) {
      setPastRequests(JSON.parse(savedRequests));
    }
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileSubmit = async () => {
    if (!selectedFile) {
      setUploadResponse('Please select a PDF file first.');
      return;
    }

    const formData = new FormData();
    formData.append('pdfFile', selectedFile);

    try {
      const response = await axios.post('http://127.0.0.1:8080/pdf-uplord', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadResponse(response.data.message);
      setPdfUploaded(true);  // Set to true when PDF is successfully uploaded
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadResponse('An error occurred while uploading the file.');
      setPdfUploaded(false);
    }
  };

  const handleStringSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8080/chatbot', { input: stringInput });
      setStringResponse(response.data.message);
      
      const newRequest = { input: stringInput, response: response.data.message };
      const updatedRequests = [...pastRequests, newRequest];
      setPastRequests(updatedRequests);
      localStorage.setItem('pdfUploaderRequests', JSON.stringify(updatedRequests));
      
      setStringInput('');
    } catch (error) {
      console.error('Error processing string:', error);
      setStringResponse('An error occurred while processing the string.');
    }
  };

  return (
    <div className="pdf-uploader">
      <div className="file-upload-section">
        <input type="file" onChange={handleFileChange} accept=".pdf" className="file-input" id="pdf-file" />
        <button onClick={handleFileSubmit} className="button">Submit PDF</button>
        <button onClick={() => document.getElementById('pdf-file').click()} className="button browse">Browse</button>
        {selectedFile && <span className="file-name">Selected file: {selectedFile.name}</span>}
        {uploadResponse && <div className="response-message">{uploadResponse}</div>}
      </div>

      {pdfUploaded && (
        <div className="string-input-section">
          <form onSubmit={handleStringSubmit}>
            <input 
              type="text" 
              value={stringInput} 
              onChange={(e) => setStringInput(e.target.value)} 
              placeholder="Enter your query here"
              className="string-input"
            />
            <button type="submit" className="button">Submit Query</button>
          </form>
          {stringResponse && <div className="response-message">{stringResponse}</div>}
        </div>
      )}

      <div className="past-requests-section">
        <h3>Past Requests</h3>
        <ul>
          {pastRequests.map((request, index) => (
            <li key={index}>
              <strong>Input:</strong> {request.input}<br />
              <strong>Response:</strong> {request.response}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;