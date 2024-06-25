import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield, faHeadset } from '@fortawesome/free-solid-svg-icons';
 
const LandingPage = () => {
  const navigate = useNavigate();
 
  const handleAdminClick = () => {
    navigate('/login/admin');
  };
 
  const handleCustomerClick = () => {
    navigate('/login/csr');
  };
 
  return (
    <div className="landing-page-unique">
      <div className="image-container-unique">
       
      </div>
      <div className="content-container-unique">
        <i>Welcome to CredApp</i>
        <div className="login-box-unique">
          <h3><FontAwesomeIcon icon={faUserShield} className="icon-unique" /> Are you an Admin?</h3>
          <button className="login-button-unique" onClick={handleAdminClick}>
            Sign in
          </button>
        </div>
        <div className="login-box-unique">
          <h3><FontAwesomeIcon icon={faHeadset} className="icon-unique" /> Are you a CSR?</h3>
          <button className="login-button-unique" onClick={handleCustomerClick}>
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};
 
export default LandingPage;