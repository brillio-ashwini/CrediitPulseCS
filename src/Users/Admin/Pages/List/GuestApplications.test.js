import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import GuestApplications from './GuestApplications';

jest.mock('axios');

describe('GuestApplications Component', () => {
  const renderComponent = () => {
    return render(
      <Router>
        <Routes>
          <Route path="/" element={<GuestApplications />} />
        </Routes>
      </Router>
    );
  };

  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: {
        content: [
          { applicationId: 1, name: 'John Doe', mobileNumber: '1234567890', guestEmail: 'john@example.com' },
          { applicationId: 2, name: 'Jane Doe', mobileNumber: '0987654321', guestEmail: 'jane@example.com' }
        ],
        totalPages: 1
      }
    });
    axios.put.mockResolvedValue({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // test('renders guest applications table and pagination', async () => {
  //   const { findByText, findAllByText, getAllByRole } = renderComponent();

  //   expect(await findByText('Pending Guest Applications')).toBeInTheDocument();
  //   expect(await findByText('John Doe')).toBeInTheDocument();
  //   expect(await findByText('Jane Doe')).toBeInTheDocument();

  //   const viewButtons = await findAllByText('View');
  //   expect(viewButtons.length).toBe(2);

  //   const paginationButtons = getAllByRole('button', { name: /[0-9]+/ });
  //   expect(paginationButtons.length).toBe(1);
  // });

  test('handles logout', async () => {
    const { findByText } = renderComponent();

    fireEvent.click(await findByText('Logout'));

    await waitFor(() => {
      expect(window.location.pathname).toBe('/');
    });
  });

  test('handles view guest application details', async () => {
    const { findAllByText } = renderComponent();

    fireEvent.click((await findAllByText('View'))[0]);

    await waitFor(() => {
      expect(window.location.pathname).toBe('/admin/guestapplicationdetailview');
    });
  });

  // test('handles approve guest application', async () => {
  //   const { findAllByText, findByText } = renderComponent();

  //   fireEvent.click((await findAllByText('Approve'))[0]);

  //   expect(await findByText('Confirm Approve')).toBeInTheDocument();

  //   fireEvent.click(await findByText('Yes'));

  //   await waitFor(() => {
  //     expect(axios.put).toHaveBeenCalledWith('http://localhost:3550/admin/guestapplication/approve/john@example.com');
  //     expect(findByText('Approve Successful')).toBeInTheDocument();
  //   });

  //   fireEvent.click(await findByText('Close'));

  //   await waitFor(() => {
  //     expect(findByText('Pending Guest Applications')).toBeInTheDocument();
  //   });
  // });

  // test('handles reject guest application', async () => {
  //   const { findAllByText, findByText } = renderComponent();

  //   fireEvent.click((await findAllByText('Reject'))[0]);

  //   expect(await findByText('Confirm Reject')).toBeInTheDocument();

  //   fireEvent.click(await findByText('Yes'));

  //   await waitFor(() => {
  //     expect(axios.put).toHaveBeenCalledWith('http://localhost:3550/admin/guestapplication/reject/john@example.com');
  //     expect(findByText('Reject Successful')).toBeInTheDocument();
  //   });

  //   fireEvent.click(await findByText('Close'));

  //   await waitFor(() => {
  //     expect(findByText('Pending Guest Applications')).toBeInTheDocument();
  //   });
  // });

  // test('handles pagination', async () => {
  //   axios.get.mockResolvedValueOnce({
  //     data: {
  //       content: [
  //         { applicationId: 3, name: 'Alice', mobileNumber: '1111111111', guestEmail: 'alice@example.com' },
  //         { applicationId: 4, name: 'Bob', mobileNumber: '2222222222', guestEmail: 'bob@example.com' }
  //       ],
  //       totalPages: 2
  //     }
  //   });

  //   const { findAllByRole } = renderComponent();

  //   await waitFor(() => {
  //     const paginationButtons = findAllByRole('button', { name: /[0-9]+/ });
  //     expect(paginationButtons.length).toBe(2); // Two page buttons should be present in this mock scenario
  //   });

  //   fireEvent.click((await findAllByRole('button', { name: '2' }))[0]); // Click on the second page button

  //   await waitFor(() => {
  //     expect(axios.get).toHaveBeenCalledWith('http://localhost:3550/admin/guestapplication/readallpending?page=1&size=9');
  //   });
  // });

  // test('opens and closes confirmation modal', async () => {
  //   const { findAllByText, findByText, queryByText } = renderComponent();

  //   fireEvent.click((await findAllByText('Approve'))[0]);

  //   expect(await findByText('Confirm Approve')).toBeInTheDocument();

  //   fireEvent.click(await findByText('No'));

  //   await waitFor(() => {
  //     expect(queryByText('Confirm Approve')).not.toBeInTheDocument();
  //   });
  // });

  // test('opens and closes success modal', async () => {
  //   const { findAllByText, findByText, queryByText } = renderComponent();

  //   fireEvent.click((await findAllByText('Approve'))[0]);

  //   expect(await findByText('Confirm Approve')).toBeInTheDocument();

  //   fireEvent.click(await findByText('Yes'));

  //   await waitFor(() => {
  //     expect(findByText('Approve Successful')).toBeInTheDocument();
  //   });

  //   fireEvent.click(await findByText('Close'));

  //   await waitFor(() => {
  //     expect(queryByText('Approve Successful')).not.toBeInTheDocument();
  //   });
  // });
});
