// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
// import Sidebar from './Sidebar';

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: jest.fn(),
// }));

// describe('Sidebar Component', () => {
//   const handleLogout = jest.fn();
//   const setActiveItem = jest.fn();
//   const navigate = jest.fn();

//   const renderComponent = (activeItem) => {
//     render(
//       <MemoryRouter>
//         <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} handleLogout={handleLogout} />
//       </MemoryRouter>
//     );
//   };

//   beforeEach(() => {
//     jest.clearAllMocks();
//     require('react-router-dom').useNavigate.mockImplementation(() => navigate);
//   });

//   test('renders sidebar with all items', () => {
//     renderComponent('Dashboard');

//     expect(screen.getByText('Home')).toBeInTheDocument();
//     expect(screen.getByText('Pending Guest Applications')).toBeInTheDocument();
//     expect(screen.getByText('Pending Customer Applications')).toBeInTheDocument();
//     expect(screen.getByText('Pending Customer Upgradation Applications')).toBeInTheDocument();
//     expect(screen.getByText('Customers')).toBeInTheDocument();
//     expect(screen.getByText('Logout')).toBeInTheDocument();
//   });

//   test('highlights the active item', () => {
//     renderComponent('All Pending Guest Applications');

//     expect(screen.getByText('Pending Guest Applications').closest('li')).toHaveClass('active');
//   });

//   test('calls setActiveItem and navigates on Dashboard button click', () => {
//     renderComponent('Dashboard');

//     const button = screen.getByText('Home');
//     fireEvent.click(button);

//     expect(setActiveItem).toHaveBeenCalledWith('Dashboard');
//     expect(navigate).toHaveBeenCalledWith('/admin/dashboard');
//   });

//   test('calls setActiveItem and navigates on Pending Guest Applications button click', () => {
//     renderComponent('Dashboard');

//     const button = screen.getByText('Pending Guest Applications');
//     fireEvent.click(button);

//     expect(setActiveItem).toHaveBeenCalledWith('All Pending Guest Applications');
//     expect(navigate).toHaveBeenCalledWith('/admin/pendingguestapplications');
//   });

//   test('calls setActiveItem and navigates on Pending Customer Applications button click', () => {
//     renderComponent('Dashboard');

//     const button = screen.getByText('Pending Customer Applications');
//     fireEvent.click(button);

//     expect(setActiveItem).toHaveBeenCalledWith('All Pending Customer Applications');
//     expect(navigate).toHaveBeenCalledWith('/admin/pendingcustomerapplications');
//   });

//   test('calls setActiveItem and navigates on Pending Customer Upgradation Applications button click', () => {
//     renderComponent('Dashboard');

//     const button = screen.getByText('Pending Customer Upgradation Applications');
//     fireEvent.click(button);

//     expect(setActiveItem).toHaveBeenCalledWith('All Pending Customer Upgrade Applications');
//     expect(navigate).toHaveBeenCalledWith('/admin/pendingcustomerupgradeapplications');
//   });

//   test('calls setActiveItem and navigates on Customers button click', () => {
//     renderComponent('Dashboard');

//     const button = screen.getByText('Customers');
//     fireEvent.click(button);

//     expect(setActiveItem).toHaveBeenCalledWith('All Customers');
//     expect(navigate).toHaveBeenCalledWith('/admin/allcustomers');
//   });

//   test('calls handleLogout on logout button click', () => {
//     renderComponent('Dashboard');

//     const logoutButton = screen.getByText('Logout');
//     fireEvent.click(logoutButton);

//     expect(handleLogout).toHaveBeenCalled();
//   });
// });

// Sidebar.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('Sidebar Component', () => {
  const setActiveItem = jest.fn();
  const handleLogout = jest.fn();
  const navigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(navigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderSidebar = (activeItem) => {
    return render(
      <MemoryRouter>
        <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} handleLogout={handleLogout} />
      </MemoryRouter>
    );
  };

  test('navigates to dashboard', () => {
    const { getByText } = renderSidebar('Dashboard');
    const button = getByText('Home');
    fireEvent.click(button);

    expect(setActiveItem).toHaveBeenCalledWith('Dashboard');
    expect(navigate).toHaveBeenCalledWith('/admin/dashboard');
  });

  test('navigates to pending guest applications', () => {
    const { getByText } = renderSidebar('All Pending Guest Applications');
    const button = getByText('Pending Guest Applications');
    fireEvent.click(button);

    expect(setActiveItem).toHaveBeenCalledWith('All Pending Guest Applications');
    expect(navigate).toHaveBeenCalledWith('/admin/pendingguestapplications');
  });

  test('navigates to pending customer applications', () => {
    const { getByText } = renderSidebar('All Pending Customer Applications');
    const button = getByText('Pending Customer Applications');
    fireEvent.click(button);

    expect(setActiveItem).toHaveBeenCalledWith('All Pending Customer Applications');
    expect(navigate).toHaveBeenCalledWith('/admin/pendingcustomerapplications');
  });

  test('navigates to pending customer upgrade applications', () => {
    const { getByText } = renderSidebar('All Pending Customer Upgrade Applications');
    const button = getByText('Pending Customer Upgradation Applications');
    fireEvent.click(button);

    expect(setActiveItem).toHaveBeenCalledWith('All Pending Customer Upgrade Applications');
    expect(navigate).toHaveBeenCalledWith('/admin/pendingcustomerupgradeapplications');
  });

  test('navigates to all customers', () => {
    const { getByText } = renderSidebar('All Customers');
    const button = getByText('Customers');
    fireEvent.click(button);

    expect(setActiveItem).toHaveBeenCalledWith('All Customers');
    expect(navigate).toHaveBeenCalledWith('/admin/allcustomers');
  });

  test('handles logout', () => {
    const { getByText } = renderSidebar('Logout');
    const button = getByText('Logout');
    fireEvent.click(button);

    expect(handleLogout).toHaveBeenCalled();
  });

  test('applies active class based on activeItem prop', () => {
    const { getByText } = renderSidebar('All Customers');
    const button = getByText('Customers');

    expect(button.parentElement).toHaveClass('active');
  });
});
