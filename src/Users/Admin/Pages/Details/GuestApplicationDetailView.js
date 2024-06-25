// pages/GuestApplicationDetailView.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import DetailView from '../../Components/DetailView/DetailView';

const GuestApplicationDetailView = () => {
  const location = useLocation();
  const { complaint } = location.state || {};

  const detailFields = [
    { label: 'Name', key: 'name' },
    { label: 'Aadhaar Number', key: 'aadhaarNumber' },
    { label: 'PAN ID', key: 'panId' },
    { label: 'Mobile Number', key: 'mobileNumber' },
    { label: 'Current Employment Company', key: 'companyName' },
    { label: 'Annual Income', key: 'annualIncome' },
    { label: 'Card Type', key: 'creditCard.cardType' },
  ];

  const downloadFiles = [
    { label: 'Download Aadhaar Card', key: 'aadhaarFilePath' },
    { label: 'Download Employment Proof', key: 'incomeProofFilePath' },
    { label: 'Download PAN Card', key: 'panFilePath' },
    { label: 'Download Signature', key: 'signatureFilePath' },
    { label: 'Download Photo', key: 'photoFilePath' }
  ];

  return (
    <DetailView
      activeItem="All Pending Guest Applications"
      details={complaint}
      detailFields={detailFields}
      downloadFiles={downloadFiles}
    />
  );
};

export default GuestApplicationDetailView;
