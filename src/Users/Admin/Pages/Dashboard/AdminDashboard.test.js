import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import AdminDashboard from './AdminDashboard';
import Sidebar from '../../Components/Sidebar/Sidebar';

jest.mock('axios');
jest.mock('../../Components/Sidebar/Sidebar', () => jest.fn(() => <div>Mocked Sidebar</div>));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('AdminDashboard Component', () => {
  const mockNavigate = jest.fn();
  beforeAll(() => {
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
  });

  const renderComponent = () => {
    return render(
      <Router>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
        </Routes>
      </Router>
    );
  };

  beforeEach(() => {
    axios.get.mockImplementation((url) => {
      switch (url) {
        case 'http://localhost:3550/admin/customerapplication/getcount':
          return Promise.resolve({ data: 10 });
        case 'http://localhost:3550/admin/customerapplication/pendinggetcount':
          return Promise.resolve({ data: 4 });
        case 'http://localhost:3550/admin/customerapplication/approvedgetcount':
          return Promise.resolve({ data: 6 });
        case 'http://localhost:3550/admin/guestapplication/getcount':
          return Promise.resolve({ data: 8 });
        case 'http://localhost:3550/admin/guestapplication/pendinggetcount':
          return Promise.resolve({ data: 3 });
        case 'http://localhost:3550/admin/guestapplication/approvedgetcount':
          return Promise.resolve({ data: 5 });
        default:
          return Promise.reject(new Error('not found'));
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // test('renders the dashboard and sidebar correctly', async () => {
  //   renderComponent();

  //   expect(await screen.findByText('Sidebar')).toBeInTheDocument();
  //   expect(await screen.findByText('Guest Applications')).toBeInTheDocument();
  //   expect(await screen.findByText('Customer Applications')).toBeInTheDocument();
  // });

  test('fetches and displays the application counts correctly', async () => {
    renderComponent();

    expect(await screen.findByText('8')).toBeInTheDocument(); // Guest Applications Count
    expect(await screen.findByText('5')).toBeInTheDocument(); // Guest Approved Applications Count
    expect(await screen.findByText('3')).toBeInTheDocument(); // Guest Pending Applications Count
    expect(await screen.findByText('10')).toBeInTheDocument(); // Customer Applications Count
    expect(await screen.findByText('6')).toBeInTheDocument(); // Customer Approved Applications Count
    expect(await screen.findByText('4')).toBeInTheDocument(); // Customer Pending Applications Count

    expect(axios.get).toHaveBeenCalledTimes(6);
  });

  test('handles API errors gracefully', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Mock console.error to silence error logs during test
    axios.get.mockRejectedValueOnce(new Error('API Error'));

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Guest Applications')).toBeInTheDocument();
    });

    expect(console.error).toHaveBeenCalled();
    console.error.mockRestore(); // Restore console.error to its original implementation
  });

  // test('handles logout correctly', async () => {
  //   renderComponent();

  //   fireEvent.click(await screen.findByText('Logout'));

  //   await waitFor(() => {
  //     expect(mockNavigate).toHaveBeenCalledWith('/');
  //   });
  // });
});

