import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../CSS/CSRSidebar.css';

const CSRSidebar = ({ activeItem, setActiveItem, handleLogout }) => {
  const navigate = useNavigate();

  const handleNavigation = (item, path) => {
    setActiveItem(item);
    navigate(path);
  };

  return (
    <aside className="csr_sidebar">
      <div>
        <h2>Dashboard <i className="fa fa-user-circle" aria-hidden="true"></i></h2>
        <ul>
          <li className={activeItem === 'Schedule Calls' ? 'active' : ''}>
            <button style={{ all: 'unset', cursor: 'pointer', width: '100%', display: 'block' }} onClick={() => handleNavigation('Schedule Calls', '/csr/schedule-calls')}>
              <i className="fa fa-phone" aria-hidden="true"></i>
              Schedule Calls
            </button>
          </li>
          <li className={activeItem === 'Grievances' ? 'active' : ''}>
            <button style={{ all: 'unset', cursor: 'pointer', width: '100%', display: 'block' }} onClick={() => handleNavigation('Grievances', '/csr/grievances')}>
              <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
              Grievances
            </button>
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li className={`logout ${activeItem === 'Logout' ? 'active' : ''}`}>
            <button style={{ all: 'unset', cursor: 'pointer', width: '100%', display: 'block' }} onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default CSRSidebar;
