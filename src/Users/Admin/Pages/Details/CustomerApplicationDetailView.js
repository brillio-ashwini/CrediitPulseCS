// pages/CustomerApplicationDetailView.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import DetailView from '../../Components/DetailView/DetailView';

const CustomerApplicationDetailView = () => {
  const location = useLocation();
  const { customer } = location.state || {};

  const detailFields = [
    { label: 'Name', key: 'name' },
    { label: 'PAN ID', key: 'panId' },
    { label: 'Mobile Number', key: 'mobileNumber' },
    { label: 'Current Employment Company', key: 'companyName' },
    { label: 'Annual Income', key: 'annualIncome' },
    { label: 'Card Type', key: 'cardType' },
  ];

  const downloadFiles = [
    { label: 'Download Employment Proof', key: 'incomeProofFilePath' }
  ];

  return (
    <DetailView
      activeItem="All Pending Customer Applications"
      details={customer}
      detailFields={detailFields}
      downloadFiles={downloadFiles}
    />
  );
};

export default CustomerApplicationDetailView;
