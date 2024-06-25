import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';

// Add #root element to the document body before the component is imported
const root = document.createElement('div');
root.setAttribute('id', 'root');
document.body.appendChild(root);

describe('LandingPage Component', () => {
  test('renders the component with correct elements', () => {
    const { getByText, getAllByRole } = render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    expect(getByText('Welcome to CredApp')).toBeInTheDocument();
    expect(getByText('Are you an Admin?')).toBeInTheDocument();
    expect(getByText('Are you a CSR?')).toBeInTheDocument();
    
    // Using getAllByRole to handle multiple buttons with the same name
    const buttons = getAllByRole('button', { name: /sign in/i });
    expect(buttons).toHaveLength(2); // We expect two buttons
  });

  test('navigates to /login/admin when Admin button is clicked', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login/admin" element={<div>Admin Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    // Select the first button
    fireEvent.click(getByText('Sign in', { selector: '.login-box-unique:nth-of-type(1) button' }));
    expect(getByText('Admin Login Page')).toBeInTheDocument();
  });

  test('navigates to /login/csr when CSR button is clicked', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login/csr" element={<div>CSR Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    // Select the second button
    fireEvent.click(getByText('Sign in', { selector: '.login-box-unique:nth-of-type(2) button' }));
    expect(getByText('CSR Login Page')).toBeInTheDocument();
  });
});




