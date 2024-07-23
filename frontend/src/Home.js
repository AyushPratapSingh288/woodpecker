import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert('Please select a PDF file first.');
      return;
    }

    const formData = new FormData();
    formData.append('pdfFile', selectedFile);

    try {
      const response = await axios.post('/pdf-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred while uploading the file.');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept=".pdf" />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Home;