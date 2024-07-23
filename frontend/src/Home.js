import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Home.css"

const PdfUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [response, setResponse] = useState('');
  const [pastResponses, setPastResponses] = useState([]);

  useEffect(() => {
    // Load past responses from localStorage when component mounts
    const savedResponses = localStorage.getItem('pdfUploaderResponses');
    if (savedResponses) {
      setPastResponses(JSON.parse(savedResponses));
    }
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setResponse('Please select a PDF file first.');
      return;
    }

    const formData = new FormData();
    formData.append('pdfFile', selectedFile);

    try {
      const response = await axios.post('http://127.0.0.1:8080/pdf-uplord', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      const responseMessage = response.data.message;
      setResponse(responseMessage);
      
      // Add new response to pastResponses
      const newPastResponses = [...pastResponses, responseMessage];
      setPastResponses(newPastResponses);
      
      // Save updated responses to localStorage
      localStorage.setItem('pdfUploaderResponses', JSON.stringify(newPastResponses));
      
    } catch (error) {
      console.error('Error uploading file:', error);
      setResponse('An error occurred while uploading the file.');
    }
  };

  return (
    <div className="pdf-uploader">
      <div className="file-input-container">
        <input type="file" onChange={handleFileChange} accept=".pdf" className="file-input" id="pdf-file" />
        <button onClick={handleSubmit} className="button">Submit</button>
        <button onClick={() => document.getElementById('pdf-file').click()} className="button browse">Browse</button>
      </div>
      
      {selectedFile && <span className="file-name">Selected file: {selectedFile.name}</span>}
      
      {response && (
        <div className="response-container">
          <h3>Response:</h3>
          <p className="response-message">{response}</p>
        </div>
      )}
      
      {pastResponses.length > 0 && (
        <div className="past-responses">
          <h3>Past Responses:</h3>
          <ul>
            {pastResponses.map((resp, index) => (
              <li key={index}>{resp}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PdfUploader;