// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import CSRDashboard from './CSRDashboard';
// import { getCustomerScheduleCallsPending, getGuestScheduleCallsPending, resolveCustomerScheduleCall, resolveGuestScheduleCall } from '../../Utils/SchduleService';
// import CSRSidebar from '../../Components/Sidebar/CSRSidebar';
// import Modal from 'react-modal';

// jest.mock('react-modal', () => {
//   const Modal = ({ isOpen, children }) => (isOpen ? <div>{children}</div> : null);
//   Modal.setAppElement = () => null;
//   return Modal;
// });

// jest.mock('../../Utils/SchduleService');
// jest.mock('../../Components/Sidebar/CSRSidebar', () => ({ activeItem, setActiveItem, handleLogout }) => (
//   <div data-testid="sidebar">
//     Sidebar Mock
//     <button onClick={handleLogout}>Logout</button>
//   </div>
// ));

// beforeEach(() => {
//   getCustomerScheduleCallsPending.mockResolvedValue({
//     data: [
//       {
//         scheduleCallId: '1',
//         customerName: 'John Doe',
//         customerEmail: 'john@example.com',
//         customerPhone: '1234567890',
//         timeSlot: '2023-01-01T00:00:00Z',
//         subject: 'Issue 1',
//         status: 'Pending'
//       }
//     ]
//   });

//   getGuestScheduleCallsPending.mockResolvedValue({
//     data: [
//       {
//         scheduleCallId: '2',
//         guestName: 'Jane Doe',
//         guestEmail: 'jane@example.com',
//         guestPhone: '0987654321',
//         timeSlot: '2023-01-02T00:00:00Z',
//         subject: 'Issue 2',
//         status: 'Pending'
//       }
//     ]
//   });

//   resolveCustomerScheduleCall.mockResolvedValue({});
//   resolveGuestScheduleCall.mockResolvedValue({});
// });

// describe('CSRDashboard Component', () => {
//   const renderComponent = () => {
//     render(
//       <Router>
//         <CSRDashboard />
//       </Router>
//     );
//   };

//   test('renders sidebar with all items', () => {
//     renderComponent();
//     expect(screen.getByTestId('sidebar')).toBeInTheDocument();
//   });

//   test('fetches and displays schedule calls', async () => {
//     renderComponent();
//     await waitFor(() => {
//       expect(screen.getByText('John Doe')).toBeInTheDocument();
//       expect(screen.getByText('Jane Doe')).toBeInTheDocument();
//     });
//   });

//   test('opens and closes modal', async () => {
//     renderComponent();
//     await waitFor(() => {
//       expect(screen.getByText('John Doe')).toBeInTheDocument();
//     });
//     fireEvent.click(screen.getAllByText('View')[0]);
//     expect(screen.getByText('Call Detail')).toBeInTheDocument();
//     fireEvent.click(screen.getByText('Close'));
//     await waitFor(() => {
//       expect(screen.queryByText('Call Detail')).not.toBeInTheDocument();
//     });
//   });

//   test('resolves customer schedule call', async () => {
//     renderComponent();
//     await waitFor(() => {
//       expect(screen.getByText('John Doe')).toBeInTheDocument();
//     });
//     fireEvent.click(screen.getAllByText('Pending')[0]);
//     await waitFor(() => {
//       expect(resolveCustomerScheduleCall).toHaveBeenCalledWith('1');
//     });
//   });

//   test('resolves guest schedule call', async () => {
//     renderComponent();
//     await waitFor(() => {
//       expect(screen.getByText('Jane Doe')).toBeInTheDocument();
//     });
//     fireEvent.click(screen.getAllByText('Pending')[1]);
//     await waitFor(() => {
//       expect(resolveGuestScheduleCall).toHaveBeenCalledWith('2');
//     });
//   });

//   test('handles logout', async () => {
//     renderComponent();
//     fireEvent.click(screen.getByText('Logout'));
//     await waitFor(() => {
//       expect(window.location.pathname).toBe('/');
//     });
//   });
// });

import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CSRDashboard from './CSRDashboard';
import * as scheduleService from '../../Utils/SchduleService';

jest.mock('../../Utils/SchduleService');
jest.mock('../../Components/Sidebar/CSRSidebar', () => (props) => (
  <div>
    <button onClick={() => props.handleLogout()}>Logout</button>
  </div>
));

describe('CSRDashboard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockCustomerCalls = [
    {
      scheduleCallId: '1',
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      customerPhone: '1234567890',
      userType: 'Customer',
      timeSlot: '2023-01-01T10:00:00Z',
      subject: 'Issue 1',
      status: 'Pending'
    }
  ];

  const mockGuestCalls = [
    {
      scheduleCallId: '2',
      guestName: 'Jane Doe',
      guestEmail: 'jane@example.com',
      guestPhone: '0987654321',
      userType: 'Guest',
      timeSlot: '2023-01-02T11:00:00Z',
      subject: 'Issue 2',
      status: 'Pending'
    }
  ];

  test('fetches and displays schedule calls', async () => {
    scheduleService.getCustomerScheduleCallsPending.mockResolvedValue({ data: mockCustomerCalls });
    scheduleService.getGuestScheduleCallsPending.mockResolvedValue({ data: mockGuestCalls });

    render(
      <MemoryRouter>
        <CSRDashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    });
  });

  test('opens and closes the modal', async () => {
    scheduleService.getCustomerScheduleCallsPending.mockResolvedValue({ data: mockCustomerCalls });
    scheduleService.getGuestScheduleCallsPending.mockResolvedValue({ data: mockGuestCalls });

    render(
      <MemoryRouter>
        <CSRDashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      fireEvent.click(screen.getAllByText('View')[0]);
    });

    expect(screen.getByText('Call Detail')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Close'));
    expect(screen.queryByText('Call Detail')).not.toBeInTheDocument();
  });

  test('handles resolving customer schedule calls', async () => {
    scheduleService.getCustomerScheduleCallsPending.mockResolvedValue({ data: mockCustomerCalls });
    scheduleService.getGuestScheduleCallsPending.mockResolvedValue({ data: [] });
    scheduleService.resolveCustomerScheduleCall.mockResolvedValue({});

    render(
      <MemoryRouter>
        <CSRDashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText('Pending'));
    });

    await waitFor(() => {
      expect(scheduleService.resolveCustomerScheduleCall).toHaveBeenCalledWith('1');
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });
  });

  test('handles resolving guest schedule calls', async () => {
    scheduleService.getCustomerScheduleCallsPending.mockResolvedValue({ data: [] });
    scheduleService.getGuestScheduleCallsPending.mockResolvedValue({ data: mockGuestCalls });
    scheduleService.resolveGuestScheduleCall.mockResolvedValue({});

    render(
      <MemoryRouter>
        <CSRDashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText('Pending'));
    });

    await waitFor(() => {
      expect(scheduleService.resolveGuestScheduleCall).toHaveBeenCalledWith('2');
      expect(screen.queryByText('Jane Doe')).not.toBeInTheDocument();
    });
  });

  test('handles pagination', async () => {
    const manyCalls = Array.from({ length: 10 }, (_, i) => ({
      ...mockCustomerCalls[0],
      scheduleCallId: `${i + 1}`,
      timeSlot: `2023-01-${i + 1}T10:00:00Z`
    }));

    scheduleService.getCustomerScheduleCallsPending.mockResolvedValue({ data: manyCalls });
    scheduleService.getGuestScheduleCallsPending.mockResolvedValue({ data: [] });

    render(
      <MemoryRouter>
        <CSRDashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByText('John Doe').length).toBe(8); // first page with 8 items
    });

    fireEvent.click(screen.getByText('2'));
    await waitFor(() => {
      expect(screen.getAllByText('John Doe').length).toBe(2); // second page with 2 items
    });
  });

  test('handles errors when fetching schedule calls', async () => {
    scheduleService.getCustomerScheduleCallsPending.mockRejectedValue(new Error('Error fetching schedule calls'));
    scheduleService.getGuestScheduleCallsPending.mockRejectedValue(new Error('Error fetching schedule calls'));

    render(
      <MemoryRouter>
        <CSRDashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('No data available')).toBeInTheDocument();
    });
  });

  test('handles errors when resolving schedule calls', async () => {
    scheduleService.getCustomerScheduleCallsPending.mockResolvedValue({ data: mockCustomerCalls });
    scheduleService.getGuestScheduleCallsPending.mockResolvedValue({ data: [] });
    scheduleService.resolveCustomerScheduleCall.mockRejectedValue(new Error('Error resolving schedule call'));

    render(
      <MemoryRouter>
        <CSRDashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText('Pending'));
    });

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument(); // Should still be in the document
    });
  });

  test('handles logout', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <CSRDashboard />
      </MemoryRouter>
    );

    fireEvent.click(getByText('Logout'));
    await waitFor(() => {
      expect(window.location.pathname).toBe('/');
    });
  });
});
