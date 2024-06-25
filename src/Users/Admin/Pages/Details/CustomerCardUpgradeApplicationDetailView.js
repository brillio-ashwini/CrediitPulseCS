
import React from 'react';
import { useLocation } from 'react-router-dom';
import DetailView from '../../Components/DetailView/DetailView';

const CustomerCardUpgradeApplicationDetailView = () => {
  const location = useLocation();
  const { customer } = location.state || {};

  const detailFields = [
    { label: 'Customer ID', key: 'customerId' },
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Mobile Number', key: 'mobileNumber' },
    { label: 'Aadhaar Number', key: 'aadhaarNumber' },
    { label: 'PAN ID', key: 'panId' },
    { label: 'Address', key: 'address' },
    { label: 'Date of Birth', key: 'dob', format: date => new Date(date).toLocaleDateString() },
    { label: 'Employment Years', key: 'employmentYears' },
    { label: 'Is Presently Employed', key: 'isPresentlyEmployed', format: value => value ? 'Yes' : 'No' },
    { label: 'Company Name', key: 'companyName' },
    { label: 'Annual Income', key: 'annualIncome' }
  ];

  const downloadFiles = [
    { label: 'Download Employment Proof', key: 'incomeProofFilePath' }
  ];

  return (
    <DetailView
      activeItem="All Pending Customer Upgrade Applications"
      details={customer}
      detailFields={detailFields}
      downloadFiles={downloadFiles}
    />
  );
};

export default CustomerCardUpgradeApplicationDetailView;
