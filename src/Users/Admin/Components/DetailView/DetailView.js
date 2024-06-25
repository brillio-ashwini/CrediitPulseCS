// components/DetailView.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar'; // Ensure this path is correct
import '../../CSS/AdminStyle.css';

const DetailView = ({ activeItem, details, detailFields, downloadFiles, downloadHandler }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const handleDownload = (filePath, fileName) => {
    axios({
      url: `http://localhost:9900/files/${filePath}`,
      method: 'GET',
      responseType: 'blob',
    })
    .then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
    })
    .catch(error => {
      console.error('Error downloading file:', error);
    });
  };

  if (!details) {
    return <p>No details available.</p>;
  }

  return (
    <div className="dashboard-container">
      <Sidebar activeItem={activeItem} handleLogout={handleLogout} />
      <div className="main-content">
        <div className="detail-view-container">
          <h1>Details</h1>
          {detailFields.map(field => (
            <p key={field.label} className="card-type">
              <strong>{field.label}:</strong> {details[field.key]}
            </p>
          ))}
          <div className="button-group">
            {downloadFiles?.map(file => (
              <button key={file.key} onClick={() => handleDownload(details[file.key], details[file.key])}>
                {file.label}
              </button>
            ))}
          </div>
          <button className="back-button" onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default DetailView;
