// GuestApplicationDetailView.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import GuestApplicationDetailView from './GuestApplicationDetailView';

// Mock DetailView component
jest.mock('../../Components/DetailView/DetailView', () => ({ activeItem, details, detailFields, downloadFiles }) => {
  if (!details) {
    return <div data-testid="NoDetails">No details available.</div>;
  }
  return (
    <div data-testid="DetailView">
      DetailView Component
      <div>Active Item: {activeItem}</div>
      <div>Details: {JSON.stringify(details)}</div>
      <div>Detail Fields: {JSON.stringify(detailFields)}</div>
      <div>Download Files: {JSON.stringify(downloadFiles)}</div>
    </div>
  );
});

describe('GuestApplicationDetailView Component', () => {
  const complaintData = {
    name: 'Jane Doe',
    aadhaarNumber: '1234-5678-9123',
    panId: 'ABCDE1234F',
    mobileNumber: '1234567890',
    companyName: 'Tech Corp',
    annualIncome: '10,00,000',
    creditCard: {
      cardType: 'Gold'
    },
    aadhaarFilePath: 'path/to/aadhaar',
    incomeProofFilePath: 'path/to/income-proof',
    panFilePath: 'path/to/pan',
    signatureFilePath: 'path/to/signature',
    photoFilePath: 'path/to/photo'
  };

  const detailFields = [
    { label: 'Name', key: 'name' },
    { label: 'Aadhaar Number', key: 'aadhaarNumber' },
    { label: 'PAN ID', key: 'panId' },
    { label: 'Mobile Number', key: 'mobileNumber' },
    { label: 'Current Employment Company', key: 'companyName' },
    { label: 'Annual Income', key: 'annualIncome' },
    { label: 'Card Type', key: 'creditCard.cardType' }
  ];

  const downloadFiles = [
    { label: 'Download Aadhaar Card', key: 'aadhaarFilePath' },
    { label: 'Download Employment Proof', key: 'incomeProofFilePath' },
    { label: 'Download PAN Card', key: 'panFilePath' },
    { label: 'Download Signature', key: 'signatureFilePath' },
    { label: 'Download Photo', key: 'photoFilePath' }
  ];

  const renderComponent = (state) => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/guest-application-detail', state }]}>
        <Routes>
          <Route path="/guest-application-detail" element={<GuestApplicationDetailView />} />
        </Routes>
      </MemoryRouter>
    );
  };

  test('renders DetailView component with correct props', () => {
    renderComponent({ complaint: complaintData });

    // Ensure the DetailView component is rendered
    expect(screen.getByTestId('DetailView')).toBeInTheDocument();

    // Ensure DetailView component is called with correct props
    expect(screen.getByText(`Active Item: All Pending Guest Applications`)).toBeInTheDocument();
    expect(screen.getByText(`Details: ${JSON.stringify(complaintData)}`)).toBeInTheDocument();
    expect(screen.getByText(`Detail Fields: ${JSON.stringify(detailFields)}`)).toBeInTheDocument();
    expect(screen.getByText(`Download Files: ${JSON.stringify(downloadFiles)}`)).toBeInTheDocument();
  });

  test('renders "No details available" when complaint data is not provided', () => {
    renderComponent({});

    // Ensure "No details available" is rendered
    expect(screen.getByTestId('NoDetails')).toBeInTheDocument();
  });
});
