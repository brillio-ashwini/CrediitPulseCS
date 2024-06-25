import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../CSS/AdminStyle.css';

const Sidebar = ({ activeItem, setActiveItem, handleLogout }) => {
  const navigate = useNavigate();

  const handleNavigation = (item, path) => {
    setActiveItem(item);
    navigate(path);
  };

  return (
    <aside className="sidebar">
      <div>
        <h2>Dashboard <i className="fa fa-user-circle" aria-hidden="true"></i></h2>
        <ul>
          <li className={activeItem === 'Dashboard' ? 'active' : ''}>
            <button
              style={{ all: 'unset', cursor: 'pointer', width: '100%', display: 'block' }}
              onClick={() => handleNavigation('Dashboard', '/admin/dashboard')}
            >
              <i className="fa fa-home" aria-hidden="true"></i>
              Home
            </button>
          </li>
          <li className={activeItem === 'All Pending Guest Applications' ? 'active' : ''}>
            <button
              style={{ all: 'unset', cursor: 'pointer', width: '100%', display: 'block' }}
              onClick={() => handleNavigation('All Pending Guest Applications', '/admin/pendingguestapplications')}
            >
              <i className="fa fa-user" aria-hidden="true"></i>
              Pending Guest Applications
            </button>
          </li>
          <li className={activeItem === 'All Pending Customer Applications' ? 'active' : ''}>
            <button
              style={{ all: 'unset', cursor: 'pointer', width: '100%', display: 'block' }}
              onClick={() => handleNavigation('All Pending Customer Applications', '/admin/pendingcustomerapplications')}
            >
              <i className="fa fa-user" aria-hidden="true"></i>
              Pending Customer Applications
            </button>
          </li>
          <li className={activeItem === 'All Pending Customer Upgrade Applications' ? 'active' : ''}>
            <button
              style={{ all: 'unset', cursor: 'pointer', width: '100%', display: 'block' }}
              onClick={() => handleNavigation('All Pending Customer Upgrade Applications', '/admin/pendingcustomerupgradeapplications')}
            >
              <i className="fa fa-user" aria-hidden="true"></i>
              Pending Customer Upgradation Applications
            </button>
          </li>
          <li className={activeItem === 'All Customers' ? 'active' : ''}>
            <button
              style={{ all: 'unset', cursor: 'pointer', width: '100%', display: 'block' }}
              onClick={() => handleNavigation('All Customers', '/admin/allcustomers')}
            >
              <i className="fas fa-users"></i>
              Customers
            </button>
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li className={`logout ${activeItem === 'Logout' ? 'active' : ''}`}>
            <button
              style={{ all: 'unset', cursor: 'pointer', width: '100%', display: 'block' }}
              onClick={handleLogout}
            >
              <i className="fas fa-sign-out-alt"></i>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
