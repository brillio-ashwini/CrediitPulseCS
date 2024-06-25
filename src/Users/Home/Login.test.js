// import React from 'react';
// import { render, fireEvent, waitFor } from '@testing-library/react';
// import { MemoryRouter, Route, Routes } from 'react-router-dom';
// import Login from './Login';
// import * as loginService from './Utils/LoginService';
// import MessageModal from './Components/MessageModal';

// // Mock the login service functions
// jest.mock('./Utils/LoginService');
// jest.mock('./Components/MessageModal', () => (props) => {
//   if (props.isOpen) {
//     return (
//       <div>
//         <div>{props.message}</div>
//         <button onClick={props.onRequestClose}>Close</button>
//       </div>
//     );
//   }
//   return null;
// });

// describe('Login Component', () => {
//   const setup = (userType) => {
//     const utils = render(
//       <MemoryRouter initialEntries={[`/login/${userType}`]}>
//         <Routes>
//           <Route path="/login/:userType" element={<Login />} />
//         </Routes>
//       </MemoryRouter>
//     );
//     const usernameInput = utils.getByLabelText(/username or email/i);
//     const passwordInput = utils.getByLabelText(/password/i);
//     const loginButton = utils.getByRole('button', { name: /sign in/i });
//     return {
//       ...utils,
//       usernameInput,
//       passwordInput,
//       loginButton,
//     };
//   };

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test('renders the Admin login form and submits successfully', async () => {
//     loginService.handleAdminLogin.mockResolvedValue('Admin logged in successfully!');
//     const { usernameInput, passwordInput, loginButton, getByText } = setup('admin');

//     fireEvent.change(usernameInput, { target: { value: 'admin' } });
//     fireEvent.change(passwordInput, { target: { value: 'password' } });
//     fireEvent.click(loginButton);

//     await waitFor(() => {
//       expect(loginService.handleAdminLogin).toHaveBeenCalledWith({ username: 'admin', password: 'password' });
//       expect(getByText('Admin logged in successfully!')).toBeInTheDocument();
//     });
//   });

//   test('renders the CSR login form and submits successfully', async () => {
//     loginService.handleCSRLogin.mockResolvedValue('CustomerService logged in successfully!');
//     const { usernameInput, passwordInput, loginButton, getByText } = setup('csr');

//     fireEvent.change(usernameInput, { target: { value: 'csr' } });
//     fireEvent.change(passwordInput, { target: { value: 'password' } });
//     fireEvent.click(loginButton);

//     await waitFor(() => {
//       expect(loginService.handleCSRLogin).toHaveBeenCalledWith({ username: 'csr', password: 'password' });
//       expect(getByText('CustomerService logged in successfully!')).toBeInTheDocument();
//     });
//   });

//   test('shows error message on Admin login failure', async () => {
//     loginService.handleAdminLogin.mockRejectedValue(new Error('Invalid admin credentials'));
//     const { usernameInput, passwordInput, loginButton, getByText } = setup('admin');

//     fireEvent.change(usernameInput, { target: { value: 'admin' } });
//     fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
//     fireEvent.click(loginButton);

//     await waitFor(() => {
//       expect(loginService.handleAdminLogin).toHaveBeenCalledWith({ username: 'admin', password: 'wrongpassword' });
//       expect(getByText('Invalid admin credentials')).toBeInTheDocument();
//     });
//   });

//   test('shows error message on CSR login failure', async () => {
//     loginService.handleCSRLogin.mockRejectedValue(new Error('Invalid CSR credentials'));
//     const { usernameInput, passwordInput, loginButton, getByText } = setup('csr');

//     fireEvent.change(usernameInput, { target: { value: 'csr' } });
//     fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
//     fireEvent.click(loginButton);

//     await waitFor(() => {
//       expect(loginService.handleCSRLogin).toHaveBeenCalledWith({ username: 'csr', password: 'wrongpassword' });
//       expect(getByText('Invalid CSR credentials')).toBeInTheDocument();
//     });
//   });
// });

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import * as loginService from './Utils/LoginService';
import MessageModal from './Components/MessageModal';

// Mock the login service functions
jest.mock('./Utils/LoginService');
jest.mock('./Components/MessageModal', () => (props) => {
  if (props.isOpen) {
    return (
      <div>
        <div>{props.message}</div>
        <button onClick={props.onRequestClose}>Close</button>
      </div>
    );
  }
  return null;
});

describe('Login Component', () => {
  const setup = (userType) => {
    const utils = render(
      <MemoryRouter initialEntries={[`/login/${userType}`]}>
        <Routes>
          <Route path="/login/:userType" element={<Login />} />
        </Routes>
      </MemoryRouter>
    );
    const usernameInput = utils.getByLabelText(/username or email/i);
    const passwordInput = utils.getByLabelText(/password/i);
    const loginButton = utils.getByRole('button', { name: /sign in/i });
    const showPasswordButton = utils.getByText(/show/i);
    return {
      ...utils,
      usernameInput,
      passwordInput,
      loginButton,
      showPasswordButton,
    };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the Admin login form and submits successfully', async () => {
    loginService.handleAdminLogin.mockResolvedValue('Admin logged in successfully!');
    const { usernameInput, passwordInput, loginButton, getByText } = setup('admin');

    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(loginService.handleAdminLogin).toHaveBeenCalledWith({ username: 'admin', password: 'password' });
      expect(getByText('Admin logged in successfully!')).toBeInTheDocument();
    });
  });

  test('renders the CSR login form and submits successfully', async () => {
    loginService.handleCSRLogin.mockResolvedValue('CustomerService logged in successfully!');
    const { usernameInput, passwordInput, loginButton, getByText } = setup('csr');

    fireEvent.change(usernameInput, { target: { value: 'csr' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(loginService.handleCSRLogin).toHaveBeenCalledWith({ username: 'csr', password: 'password' });
      expect(getByText('CustomerService logged in successfully!')).toBeInTheDocument();
    });
  });

  test('shows error message on Admin login failure', async () => {
    loginService.handleAdminLogin.mockRejectedValue(new Error('Invalid admin credentials'));
    const { usernameInput, passwordInput, loginButton, getByText } = setup('admin');

    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(loginService.handleAdminLogin).toHaveBeenCalledWith({ username: 'admin', password: 'wrongpassword' });
      expect(getByText('Invalid admin credentials')).toBeInTheDocument();
    });
  });

  test('shows error message on CSR login failure', async () => {
    loginService.handleCSRLogin.mockRejectedValue(new Error('Invalid CSR credentials'));
    const { usernameInput, passwordInput, loginButton, getByText } = setup('csr');

    fireEvent.change(usernameInput, { target: { value: 'csr' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(loginService.handleCSRLogin).toHaveBeenCalledWith({ username: 'csr', password: 'wrongpassword' });
      expect(getByText('Invalid CSR credentials')).toBeInTheDocument();
    });
  });

  test('displays an error message when login fails due to network error', async () => {
    loginService.handleAdminLogin.mockRejectedValue(new Error('Network error'));
    const { usernameInput, passwordInput, loginButton, getByText } = setup('admin');

    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'admin123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(loginService.handleAdminLogin).toHaveBeenCalledWith({ username: 'admin', password: 'admin123' });
      expect(getByText('Network error')).toBeInTheDocument();
    });
  });

  test('toggles password visibility', () => {
    const { passwordInput, showPasswordButton } = setup('admin');

    // Initially password should be hidden
    expect(passwordInput).toHaveAttribute('type', 'password');

    // Click to show password
    fireEvent.click(showPasswordButton);
    expect(passwordInput).toHaveAttribute('type', 'text');

    // Click to hide password again
    fireEvent.click(showPasswordButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});

