import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CSRSidebar from './CSRSidebar';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('CSRSidebar Component', () => {
  const handleLogout = jest.fn();
  const setActiveItem = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    require('react-router-dom').useNavigate.mockImplementation(() => mockNavigate);
  });

  const renderComponent = (activeItem) => {
    return render(
      <Router>
        <CSRSidebar activeItem={activeItem} setActiveItem={setActiveItem} handleLogout={handleLogout} />
      </Router>
    );
  };

  test('renders sidebar with all items', () => {
    renderComponent('Schedule Calls');

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Schedule Calls')).toBeInTheDocument();
    expect(screen.getByText('Grievances')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  test('highlights the active item', () => {
    renderComponent('Grievances');

    expect(screen.getByText('Grievances').closest('li')).toHaveClass('active');
  });

  test('calls setActiveItem and navigates on Schedule Calls button click', () => {
    renderComponent('Dashboard');

    const button = screen.getByText('Schedule Calls');
    fireEvent.click(button);

    expect(setActiveItem).toHaveBeenCalledWith('Schedule Calls');
    expect(mockNavigate).toHaveBeenCalledWith('/csr/schedule-calls');
  });

  test('calls setActiveItem and navigates on Grievances button click', () => {
    renderComponent('Dashboard');

    const button = screen.getByText('Grievances');
    fireEvent.click(button);

    expect(setActiveItem).toHaveBeenCalledWith('Grievances');
    expect(mockNavigate).toHaveBeenCalledWith('/csr/grievances');
  });

  test('calls handleLogout on logout button click', () => {
    renderComponent('Dashboard');

    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);

    expect(handleLogout).toHaveBeenCalled();
  });
});
