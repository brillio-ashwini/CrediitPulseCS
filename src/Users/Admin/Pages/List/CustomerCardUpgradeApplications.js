import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Table from '../../Components/Table/Table';
import Pagination from '../../Components/Pagination/Pagination';
import { fetchData } from '../../Utils/FetchData/FetchData';
import '../../CSS/AdminStyle.css';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Ensure the modal can be used with accessibility in mind

const CustomerCardUpgradeApplications = () => {
  const [customerApplications, setCustomerApplications] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const pageSize = 9;
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('All Pending Customer Upgrade Applications');

  useEffect(() => {
    fetchData(`http://localhost:3550/admin/customerupgradeapplication/readallpending?page=${page}&size=${pageSize}`, setCustomerApplications, setTotalPages);
  }, [page]);

  const handleLogout = () => {
    navigate('/');
  };

  const handleView = (customer) => {
    navigate('/admin/customerupgradeapplicationdetailview', { state: { customer, activeItem: 'All Pending Customer Upgrade Applications' } });
  };

  const openModal = (action, id) => {
    setCurrentAction(action);
    setSelectedId(id);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentAction(null);
    setSelectedId(null);
  };

  const handleConfirm = () => {
    if (currentAction && selectedId) {
      closeModal(); // Close the confirmation modal immediately
      const url = currentAction === 'approve'
        ? `http://localhost:3550/admin/customerupgradeapplication/approve/${selectedId}`
        : `http://localhost:3550/admin/customerapplication/reject/${selectedId}`;

      axios.put(url)
        .then(response => {
          setCustomerApplications(prev => prev.filter(app => app.applicationId !== selectedId));
          openSuccessModal(currentAction);
        })
        .catch(error => {
          console.error(`Error ${currentAction}ing application:`, error);
        });
    }
  };

  const openSuccessModal = (action) => {
    setSuccessModalIsOpen(true);
    setCurrentAction(action);
  };

  const closeSuccessModal = () => {
    setSuccessModalIsOpen(false);
    setCurrentAction(null);
  };

  const renderRow = (application) => (
    <tr key={application.applicationId}>
      <td>{application.applicationId}</td>
      <td>{application.customerName}</td>
      <td>{application.email}</td>
      <td>
        <button className="view-button" onClick={() => handleView(application)}>View</button>
        <button className="approve-button" onClick={() => openModal('approve', application.applicationId)}>Approve</button>
        <button className="reject-button" onClick={() => openModal('reject', application.applicationId)}>Reject</button>
      </td>
    </tr>
  );

  return (
    <div className="dashboard-container">
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} handleLogout={handleLogout} />
      <div className="main-content">
        <div className="table-container">
          <h3>Pending Customer Card Upgradation Applications</h3>
          <Table
            headers={['Application ID', 'Customer Name', 'Email', 'Actions']}
            data={customerApplications}
            renderRow={renderRow}
          />
          <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} />
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Action"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Confirm {currentAction && currentAction.charAt(0).toUpperCase() + currentAction.slice(1)}</h2>
        <p>Are you sure you want to {currentAction} this application?</p>
        <button onClick={handleConfirm}>Yes</button>
        <button onClick={closeModal}>No</button>
      </Modal>
      <Modal
        isOpen={successModalIsOpen}
        onRequestClose={closeSuccessModal}
        contentLabel="Action Successful"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>{currentAction && currentAction.charAt(0).toUpperCase() + currentAction.slice(1)} Successful</h2>
        <p>The application has been {currentAction}d successfully.</p>
        <button onClick={closeSuccessModal}>Close</button>
      </Modal>
    </div>
  );
};

export default CustomerCardUpgradeApplications;
