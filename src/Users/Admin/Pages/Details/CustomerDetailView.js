
import React from 'react';
import { useLocation } from 'react-router-dom';
import DetailView from '../../Components/DetailView/DetailView';

const CustomerDetailView = () => {
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

  return (
    <DetailView
      activeItem="All Customers"
      details={customer}
      detailFields={detailFields}
    />
  );
};

export default CustomerDetailView;
