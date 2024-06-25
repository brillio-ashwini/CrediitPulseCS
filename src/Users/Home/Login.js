// pages/Login.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { handleAdminLogin, handleCSRLogin } from './Utils/LoginService'; // Ensure this path is correct
import MessageModal from './Components/MessageModal'; // Import the modal component
import './Login.css';
import './LandingPage.css'; // Ensure you have appropriate styling

const Login = () => {
  const { userType } = useParams(); // Get userType from URL
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  const openModal = (message) => {
    setModalMessage(message);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const loginRequest = { username, password };

    try {
      let responseMessage;
      if (userType === 'admin') {
        responseMessage = await handleAdminLogin(loginRequest);
        if (responseMessage === 'Admin logged in successfully!') {
          openModal(responseMessage);
          setTimeout(() => {
            closeModal();
            navigate('/admin/dashboard'); // Redirect to the admin dashboard or appropriate page
          }, 2000);
        } else {
          openModal('Invalid admin credentials');
        }
      } else if (userType === 'csr') {
        responseMessage = await handleCSRLogin(loginRequest);
        if (responseMessage === 'CustomerService logged in successfully!') {
          openModal(responseMessage);
          setTimeout(() => {
            closeModal();
            navigate('/csr/schedule-calls'); // Redirect to the CSR dashboard or appropriate page
          }, 2000);
        } else {
          openModal('Invalid CSR credentials');
        }
      }
    } catch (error) {
      openModal(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="image-container-unique">
        {/* You can add additional elements inside this div if needed */}
      </div>
      <div className="login-form-container">
        <div className='login-box'>
          <h2>{userType === 'admin' ? 'Admin Login' : 'CSR Login'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username or Email</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="show-password-button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {error && <p className="error">{error}</p>}
            <button type="submit" className="login-button">Sign in</button>
          </form>
        </div>
      </div>
      <MessageModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        message={modalMessage}
      />
    </div>
  );
};

export default Login;
