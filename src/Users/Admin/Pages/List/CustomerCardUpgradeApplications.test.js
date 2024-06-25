import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import CustomerCardUpgradeApplications from './CustomerCardUpgradeApplications';

// Mock dependencies
jest.mock('axios');
jest.mock('../../Components/Sidebar/Sidebar', () => ({ activeItem, setActiveItem, handleLogout }) => (
  <div data-testid="sidebar">
    Sidebar Mock
    <button onClick={handleLogout}>Logout</button>
  </div>
));
jest.mock('../../Components/Table/Table', () => ({ headers, data, renderRow }) => (
  <table data-testid="table">
    <thead>
      <tr>{headers.map(header => <th key={header}>{header}</th>)}</tr>
    </thead>
    <tbody>{data.map(renderRow)}</tbody>
  </table>
));
jest.mock('../../Components/Pagination/Pagination', () => ({ totalPages, currentPage, onPageChange }) => (
  <div data-testid="pagination">
    <button onClick={() => onPageChange(0)}>Page 1</button>
    <button onClick={() => onPageChange(1)}>Page 2</button>
  </div>
));
jest.mock('../../Utils/FetchData/FetchData', () => ({
  fetchData: jest.fn(),
}));

// Mock react-modal to avoid setAppElement error
jest.mock('react-modal', () => {
  const Modal = ({ children }) => <div>{children}</div>;
  Modal.setAppElement = () => {};
  return Modal;
});

const mockApplications = [
  { applicationId: '1', customerName: 'John Doe', email: 'john@example.com' },
  { applicationId: '2', customerName: 'Jane Smith', email: 'jane@example.com' }
];

describe('CustomerCardUpgradeApplications Component', () => {
  beforeEach(() => {
    axios.put.mockResolvedValue({});
    require('../../Utils/FetchData/FetchData').fetchData.mockImplementation((url, setData, setTotalPages) => {
      setData(mockApplications);
      setTotalPages(2);
    });
  });

  const renderComponent = () => {
    render(
      <MemoryRouter initialEntries={['/admin/customerupgradeapplications']}>
        <Routes>
          <Route path="/admin/customerupgradeapplications" element={<CustomerCardUpgradeApplications />} />
        </Routes>
      </MemoryRouter>
    );
  };

  test('renders CustomerCardUpgradeApplications component correctly', () => {
    renderComponent();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('table')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  test('pagination works correctly', () => {
    renderComponent();
    fireEvent.click(screen.getByText('Page 2'));
    expect(require('../../Utils/FetchData/FetchData').fetchData).toHaveBeenCalledWith(
      'http://localhost:3550/admin/customerupgradeapplication/readallpending?page=1&size=9',
      expect.any(Function),
      expect.any(Function)
    );
  });

  test('approve modal opens and confirms action', async () => {
    renderComponent();
    fireEvent.click(screen.getAllByText('Approve')[0]);
    expect(screen.getByText('Confirm Approve')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Yes'));
    await waitFor(() => expect(axios.put).toHaveBeenCalledWith('http://localhost:3550/admin/customerupgradeapplication/approve/1'));
    expect(screen.getByText('Approve Successful')).toBeInTheDocument();
  });

  test('reject modal opens and confirms action', async () => {
    renderComponent();
    fireEvent.click(screen.getAllByText('Reject')[0]);
    expect(screen.getByText('Confirm Reject')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Yes'));
    await waitFor(() => expect(axios.put).toHaveBeenCalledWith('http://localhost:3550/admin/customerapplication/reject/1'));
    expect(screen.getByText('Reject Successful')).toBeInTheDocument();
  });
});
