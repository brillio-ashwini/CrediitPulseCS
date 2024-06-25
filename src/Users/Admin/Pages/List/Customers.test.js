
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Customers from './Customers';
import axios from 'axios';

jest.mock('axios');

describe('Customers Component', () => {
  const renderComponent = () => {
    return render(
      <Router>
        <Routes>
          <Route path="/" element={<Customers />} />
        </Routes>
      </Router>
    );
  };

  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: {
        content: [
          { customerId: 1, name: 'John Doe', email: 'john@example.com', mobileNumber: '1234567890' },
          { customerId: 2, name: 'Jane Doe', email: 'jane@example.com', mobileNumber: '0987654321' }
        ],
        totalPages: 1
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders customers table and pagination', async () => {
    const { getByText, getAllByText, getAllByRole } = renderComponent();

    await waitFor(() => {
      const headers = getAllByText('Customers');
      expect(headers[1]).toBeInTheDocument(); // Ensure the correct header is being checked
      expect(getByText('John Doe')).toBeInTheDocument();
      expect(getByText('Jane Doe')).toBeInTheDocument();
    });

    const viewButtons = getAllByText((content, element) => {
      return element.tagName.toLowerCase() === 'button' && content === 'View';
    });
    expect(viewButtons.length).toBe(2);

    const paginationButtons = getAllByRole('button', { name: /[0-9]+/ });
    expect(paginationButtons.length).toBe(1); // Only one page button should be present in this mock scenario
  });

  test('handles logout', async () => {
    const { getByText } = renderComponent();

    fireEvent.click(getByText('Logout'));

    await waitFor(() => {
      expect(window.location.pathname).toBe('/');
    });
  });

  // test('handles view customer details', async () => {
  //   const { getAllByText } = renderComponent();

  //   fireEvent.click(getAllByText((content, element) => {
  //     return element.tagName.toLowerCase() === 'button' && content === 'View';
  //   })[0]);

  //   await waitFor(() => {
  //     expect(window.location.pathname).toBe('/admin/customerdetail');
  //   });
  // });

  test('renders pagination and navigates pages', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        content: [
          { customerId: 3, name: 'Alice', email: 'alice@example.com', mobileNumber: '1111111111' },
          { customerId: 4, name: 'Bob', email: 'bob@example.com', mobileNumber: '2222222222' }
        ],
        totalPages: 2
      }
    });

    const { getAllByRole } = renderComponent();

    await waitFor(() => {
      const paginationButtons = getAllByRole('button', { name: /[0-9]+/ });
      expect(paginationButtons.length).toBe(2); // Two page buttons should be present in this mock scenario
    });

    fireEvent.click(getAllByRole('button', { name: '2' })[0]); // Click on the second page button

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('http://localhost:3550/admin/customer/readall?page=1&size=9');
    });
  });
});
