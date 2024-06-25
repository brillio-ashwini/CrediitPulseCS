import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import '../CSS/CSRDashboard.css';
import { useNavigate } from 'react-router-dom';
import CSRSidebar from '../Components/Sidebar/CSRSidebar';
  import { resolveCustomerGrievance, resolveGuestGrievance,getCustomerGrievancesPending , getGuestGrievancesPending} from '../Utils/SchduleService';


Modal.setAppElement('#root'); 

const Grievances = () => {
  const [grievances, setGrievances] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [activeItem, setActiveItem] = useState('Grievances');
  const [message, setMessage] = useState('');
  const itemsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    fetchPendingGrievances();
  }, []);

  const handleLogout = () => {
    navigate('/');
  };

  const fetchPendingGrievances = async () => {
    try {
      const [customerResponse, guestResponse] = await Promise.all([
        getCustomerGrievancesPending(),
        getGuestGrievancesPending()
      ]);

      const combinedGrievances = [
        ...customerResponse.data.map(grievance => ({ ...grievance, userType: 'Customer' })),
        ...guestResponse.data.map(grievance => ({ ...grievance, userType: 'Guest' }))
      ].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

      setGrievances(combinedGrievances);
    } catch (error) {
      console.error('Error fetching grievances', error);
      setGrievances([]);
    }
  };

  const handleView = (grievance) => {
    setModalContent(grievance);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent({});
    setMessage('');
  };

  const handleSubmit = async () => {
    try {
      if (modalContent.userType === 'Customer') {
        await resolveCustomerGrievance(modalContent.grievanceId, message);
      } else {
        await resolveGuestGrievance(modalContent.grievanceId, message);
      }
      setGrievances(prevGrievances => prevGrievances.filter(g => g.grievanceId !== modalContent.grievanceId));
      closeModal();
    } catch (error) {
      console.error('Error resolving grievance', error);
    }
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  // Logic for displaying current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = grievances.slice(indexOfFirstItem, indexOfLastItem);

  // Logic for pagination controls
  const totalPages = Math.ceil(grievances.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="dashboard-container-grivences">
      <CSRSidebar activeItem={activeItem} setActiveItem={setActiveItem} handleLogout={handleLogout} />
      <div className="main-content-grivences">
        <div className="table-container-grivences">
          <h3>Pending Grievances</h3>
          <table>
            <thead>
              <tr>
                <th>User Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>User Type</th>
                <th>Timestamp</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="8">No data available</td>
                </tr>
              ) : (
                currentItems.map((grievance) => (
                  <tr key={`${grievance.grievanceId}-${grievance.userType}`}>
                    <td>{grievance.userType === 'Guest' ? grievance.guestName : grievance.customerName}</td>
                    <td>{grievance.userType === 'Guest' ? grievance.guestEmail : grievance.customerEmail}</td>
                    <td>{grievance.userType === 'Guest' ? grievance.guestPhone : grievance.customerPhone}</td>
                    <td>{grievance.userType}</td>
                    <td>{grievance.timestamp}</td>
                    <td>{grievance.subject}</td>
                    <td>
                      <button className={`status-button ${grievance.status.toLowerCase()}`} onClick={() => handleView(grievance)}>
                        {grievance.status}
                      </button>
                    </td>
                    <td>
                      <button className="view-button" onClick={() => handleView(grievance)}>View</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={`page-${i + 1}`}
                onClick={() => paginate(i + 1)}
                className={currentPage === i + 1 ? 'active' : ''}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Grievance Detail Modal"
        className="modal-grivences"
        overlayClassName="modal-overlay"
      >
        <h2>Grievance Detail</h2>
        <p><strong>Subject:</strong> {modalContent.subject}</p>
        <p><strong>Description:</strong> {modalContent.description}</p>
        <textarea 
          value={message}
          onChange={handleMessageChange}
          placeholder="Add your message here"
          rows="4"
          style={{ width: '100%', marginTop: '10px' }}
        ></textarea>
        <button className="cancel-button" onClick={closeModal}>Close</button>
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
      </Modal>
    </div>
  );
};

export default Grievances;
