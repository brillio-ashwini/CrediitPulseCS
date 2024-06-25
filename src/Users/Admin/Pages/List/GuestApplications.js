import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Table from '../../Components/Table/Table';
import Pagination from '../../Components/Pagination/Pagination';
import { fetchData } from '../../Utils/FetchData/FetchData';
import '../../CSS/AdminStyle.css';

Modal.setAppElement('#root'); // Ensure the modal can be used with accessibility in mind

const GuestApplications = () => {
  const [guestApplications, setGuestApplications] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const pageSize = 9;
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('All Pending Guest Applications');
  
  useEffect(() => {
    fetchData(`http://localhost:3550/admin/guestapplication/readallpending?page=${page}&size=${pageSize}`, setGuestApplications, setTotalPages);
  }, [page]);

  const handleLogout = () => {
    navigate('/');
  };

  const handleView = (complaint) => {
    navigate('/admin/guestapplicationdetailview', { state: { complaint, activeItem: 'All Pending Guest Applications' } });
  };

  const openModal = (action, guestEmail) => {
    setCurrentAction(action);
    setSelectedEmail(guestEmail);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentAction(null);
    setSelectedEmail(null);
  };

  const handleConfirm = () => {
    if (currentAction && selectedEmail) {
      closeModal(); // Close the confirmation modal immediately
      const url = currentAction === 'approve'
        ? `http://localhost:3550/admin/guestapplication/approve/${selectedEmail}`
        : `http://localhost:3550/admin/guestapplication/reject/${selectedEmail}`;

      axios.put(url)
        .then(response => {
          setGuestApplications(prev => prev.filter(app => app.guestEmail !== selectedEmail));
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
      <td>{application.name}</td>
      <td>{application.mobileNumber}</td>
      <td className="actions">
        <button className="view-button" onClick={() => handleView(application)}>View</button>
        <button className="approve-button" onClick={() => openModal('approve', application.guestEmail)}>Approve</button>
        <button className="reject-button" onClick={() => openModal('reject', application.guestEmail)}>Reject</button>
      </td>
    </tr>
  );

  return (
    <div className="dashboard-container">
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} handleLogout={handleLogout} />
      <div className="main-content">
        <div className="table-container">
          <h3>Pending Guest Applications</h3>
          <Table
            headers={['Application ID', 'Guest Name', 'Phone Number', 'Actions']}
            data={guestApplications}
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

export default GuestApplications;
