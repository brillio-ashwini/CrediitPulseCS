
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Grievances from './Grievances';
import * as scheduleService from '../Utils/SchduleService';

jest.mock('../Utils/SchduleService');

describe('Grievances Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockCustomerGrievances = [
    {
      grievanceId: '1',
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      customerPhone: '1234567890',
      userType: 'Customer',
      timestamp: '2023-01-01T00:00:00Z',
      subject: 'Issue 1',
      description: 'Description 1',
      status: 'Pending'
    }
  ];

  const mockGuestGrievances = [
    {
      grievanceId: '2',
      guestName: 'Jane Doe',
      guestEmail: 'jane@example.com',
      guestPhone: '0987654321',
      userType: 'Guest',
      timestamp: '2023-01-02T00:00:00Z',
      subject: 'Issue 2',
      description: 'Description 2',
      status: 'Pending'
    }
  ];

  test('fetches and displays pending grievances', async () => {
    scheduleService.getCustomerGrievancesPending.mockResolvedValue({ data: mockCustomerGrievances });
    scheduleService.getGuestGrievancesPending.mockResolvedValue({ data: mockGuestGrievances });

    render(
      <MemoryRouter>
        <Grievances />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    });
  });

  test('opens and closes the modal', async () => {
    scheduleService.getCustomerGrievancesPending.mockResolvedValue({ data: mockCustomerGrievances });
    scheduleService.getGuestGrievancesPending.mockResolvedValue({ data: mockGuestGrievances });

    render(
      <MemoryRouter>
        <Grievances />
      </MemoryRouter>
    );

    await waitFor(() => {
      fireEvent.click(screen.getAllByText('View')[0]);
    });

    expect(screen.getByText('Grievance Detail')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Close'));
    expect(screen.queryByText('Grievance Detail')).not.toBeInTheDocument();
  });

  test('submits resolution for customer grievance', async () => {
    scheduleService.getCustomerGrievancesPending.mockResolvedValue({ data: mockCustomerGrievances });
    scheduleService.getGuestGrievancesPending.mockResolvedValue({ data: [] });
    scheduleService.resolveCustomerScheduleCall.mockResolvedValue({});

    render(
      <MemoryRouter>
        <Grievances />
      </MemoryRouter>
    );

    await waitFor(() => {
      fireEvent.click(screen.getAllByText('View')[0]);
    });

    fireEvent.change(screen.getByPlaceholderText('Add your message here'), { target: { value: 'Resolved' } });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(scheduleService.resolveCustomerScheduleCall).toHaveBeenCalledWith('1', 'Resolved');
      expect(screen.queryByText('Grievance Detail')).not.toBeInTheDocument();
    });
  });

  test('submits resolution for guest grievance', async () => {
    scheduleService.getCustomerGrievancesPending.mockResolvedValue({ data: [] });
    scheduleService.getGuestGrievancesPending.mockResolvedValue({ data: mockGuestGrievances });
    scheduleService.resolveGuestScheduleCall.mockResolvedValue({});

    render(
      <MemoryRouter>
        <Grievances />
      </MemoryRouter>
    );

    await waitFor(() => {
      fireEvent.click(screen.getAllByText('View')[0]);
    });

    fireEvent.change(screen.getByPlaceholderText('Add your message here'), { target: { value: 'Resolved' } });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(scheduleService.resolveGuestScheduleCall).toHaveBeenCalledWith('2', 'Resolved');
      expect(screen.queryByText('Grievance Detail')).not.toBeInTheDocument();
    });
  });

  test('handles pagination', async () => {
    const manyGrievances = Array.from({ length: 10 }, (_, i) => ({
      ...mockCustomerGrievances[0],
      grievanceId: `${i + 1}`,
      timestamp: `2023-01-${i + 1}T00:00:00Z`
    }));

    scheduleService.getCustomerGrievancesPending.mockResolvedValue({ data: manyGrievances });
    scheduleService.getGuestGrievancesPending.mockResolvedValue({ data: [] });

    render(
      <MemoryRouter>
        <Grievances />
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

  test('handles error when fetching grievances', async () => {
    scheduleService.getCustomerGrievancesPending.mockRejectedValue(new Error('Error fetching grievances'));
    scheduleService.getGuestGrievancesPending.mockRejectedValue(new Error('Error fetching grievances'));

    render(
      <MemoryRouter>
        <Grievances />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('No data available')).toBeInTheDocument();
    });
  });

  test('handles error when resolving grievances', async () => {
    scheduleService.getCustomerGrievancesPending.mockResolvedValue({ data: mockCustomerGrievances });
    scheduleService.getGuestGrievancesPending.mockResolvedValue({ data: [] });
    scheduleService.resolveCustomerScheduleCall.mockRejectedValue(new Error('Error resolving grievance'));

    render(
      <MemoryRouter>
        <Grievances />
      </MemoryRouter>
    );

    await waitFor(() => {
      fireEvent.click(screen.getAllByText('View')[0]);
    });

    fireEvent.change(screen.getByPlaceholderText('Add your message here'), { target: { value: 'Resolved' } });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(scheduleService.resolveCustomerScheduleCall).toHaveBeenCalledWith('1', 'Resolved');
      expect(screen.getByText('Grievance Detail')).toBeInTheDocument(); // Modal should remain open due to error
    });
  });

  test('handles modal actions correctly', async () => {
    scheduleService.getCustomerGrievancesPending.mockResolvedValue({ data: mockCustomerGrievances });
    scheduleService.getGuestGrievancesPending.mockResolvedValue({ data: [] });

    render(
      <MemoryRouter>
        <Grievances />
      </MemoryRouter>
    );

    await waitFor(() => {
      fireEvent.click(screen.getAllByText('View')[0]);
    });

    fireEvent.change(screen.getByPlaceholderText('Add your message here'), { target: { value: 'Some message' } });
    fireEvent.click(screen.getByText('Close'));
    expect(screen.queryByText('Grievance Detail')).not.toBeInTheDocument();

    fireEvent.click(screen.getAllByText('View')[0]);
    expect(screen.getByPlaceholderText('Add your message here').value).toBe('');
  });
});
