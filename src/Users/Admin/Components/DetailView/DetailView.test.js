// DetailView.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import DetailView from './DetailView';

jest.mock('axios');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../Sidebar/Sidebar', () => ({ activeItem, handleLogout }) => (
  <div data-testid="sidebar">
    Sidebar Mock
    <button onClick={handleLogout}>Logout</button>
  </div>
));

// Mock window.URL.createObjectURL
window.URL.createObjectURL = jest.fn();

describe('DetailView Component', () => {
  const navigate = jest.fn();
  const detailFields = [
    { label: 'Customer ID', key: 'customerId' },
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
  ];
  const downloadFiles = [
    { label: 'Download File 1', key: 'file1' },
    { label: 'Download File 2', key: 'file2' },
  ];
  const details = {
    customerId: '123',
    name: 'John Doe',
    email: 'john.doe@example.com',
    file1: 'file1.pdf',
    file2: 'file2.pdf',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    require('react-router-dom').useNavigate.mockImplementation(() => navigate);
  });

  const renderComponent = (details) => {
    render(
      <MemoryRouter>
        <DetailView
          activeItem="Detail"
          details={details}
          detailFields={detailFields}
          downloadFiles={downloadFiles}
        />
      </MemoryRouter>
    );
  };

  test('renders no details available when details is null', () => {
    renderComponent(null);

    expect(screen.getByText('No details available.')).toBeInTheDocument();
  });

  test('renders DetailView component correctly with details', () => {
    renderComponent(details);

    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('Customer ID:')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText('Name:')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Email:')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
  });

  test('handles logout button click', () => {
    renderComponent(details);

    fireEvent.click(screen.getByText('Logout'));
    expect(navigate).toHaveBeenCalledWith('/');
  });

  test('handles back button click', () => {
    renderComponent(details);

    fireEvent.click(screen.getByText('Back'));
    expect(navigate).toHaveBeenCalledWith(-1);
  });

  test('handles file download click', async () => {
    axios.mockResolvedValueOnce({ data: new Blob(['file content']) });

    renderComponent(details);

    const downloadButton1 = screen.getByText('Download File 1');
    fireEvent.click(downloadButton1);

    expect(axios).toHaveBeenCalledWith({
      url: 'http://localhost:9900/files/file1.pdf',
      method: 'GET',
      responseType: 'blob',
    });
  });

  test('handles file download error', async () => {
    axios.mockRejectedValueOnce(new Error('Download error'));

    renderComponent(details);

    const downloadButton1 = screen.getByText('Download File 1');
    fireEvent.click(downloadButton1);

    expect(axios).toHaveBeenCalledWith({
      url: 'http://localhost:9900/files/file1.pdf',
      method: 'GET',
      responseType: 'blob',
    });
  });

  test('renders correctly without download files', () => {
    render(
      <MemoryRouter>
        <DetailView
          activeItem="Detail"
          details={details}
          detailFields={detailFields}
          downloadFiles={[]}
        />
      </MemoryRouter>
    );

    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.queryByText('Download File 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Download File 2')).not.toBeInTheDocument();
  });

  // test('handles missing detail keys gracefully', () => {
  //   const incompleteDetails = {
  //     customerId: '123',
  //     name: 'John Doe',
  //   };

  //   renderComponent(incompleteDetails);

  //   expect(screen.getByText('Customer ID:')).toBeInTheDocument();
  //   expect(screen.getByText('123')).toBeInTheDocument();
  //   expect(screen.getByText('Name:')).toBeInTheDocument();
  //   expect(screen.getByText('John Doe')).toBeInTheDocument();
  //   expect(screen.queryByText('Email:')).not.toBeInTheDocument();
  // });
});


