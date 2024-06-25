import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import '../../CSS/CSRDashboard.css'
import { useNavigate } from 'react-router-dom';
import CSRSidebar from '../../Components/Sidebar/CSRSidebar';
import { getCustomerScheduleCallsPending,getGuestScheduleCallsPending , resolveCustomerScheduleCall, resolveGuestScheduleCall } from '../../Utils/SchduleService';


Modal.setAppElement('#root'); // Ensure the modal can be used with accessibility in mind

const CSRDashboard = () => {
  const [scheduleCalls, setScheduleCalls] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const itemsPerPage = 8;
  const [activeItem, setActiveItem] = useState('Schedule Calls');
  const navigate = useNavigate();

  useEffect(() => {
    fetchScheduleCalls();
  }, []);

  const fetchScheduleCalls = async () => {
    try {
      const [customerResponse, guestResponse] = await Promise.all([
      getCustomerScheduleCallsPending(),
      getGuestScheduleCallsPending()
      ]);

      const combinedScheduleCalls = [
        ...customerResponse.data.map(call => ({ ...call, userType: 'Customer' })),
        ...guestResponse.data.map(call => ({ ...call, userType: 'Guest' }))
      ].sort((a, b) => new Date(a.timeSlot) - new Date(b.timeSlot));

      setScheduleCalls(combinedScheduleCalls);
    } catch (error) {
      console.error('Error fetching schedule calls', error);
      setScheduleCalls([]);
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleView = (call) => {
    setModalContent(call);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent({});
  };

  const handleResolve = async (call) => {
    try {
      if (call.userType === 'Customer') {
        await resolveCustomerScheduleCall(call.scheduleCallId);
      } else {
        await resolveGuestScheduleCall(call.scheduleCallId);
      }
      setScheduleCalls(prevCalls => prevCalls.filter(c => c.scheduleCallId !== call.scheduleCallId));
    } catch (error) {
      console.error('Error resolving schedule call', error);
    }
  };

  // Logic for displaying current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = scheduleCalls.slice(indexOfFirstItem, indexOfLastItem);

  // Logic for pagination controls
  const totalPages = Math.ceil(scheduleCalls.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="dashboard-container-grivences">
      <CSRSidebar activeItem={activeItem} setActiveItem={setActiveItem} handleLogout={handleLogout} />
      <div className="main-content-grivences">
        <div className="table-container-grivences">
          <h3>Schedule Calls</h3>
          <table>
            <thead>
              <tr>
                <th>User Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>User Type</th>
                <th>Timeslot</th>
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
                currentItems.map((call) => (
                  <tr key={`${call.scheduleCallId}-${call.userType}`}>
                    <td>{call.userType === 'Guest' ? call.guestName : call.customerName}</td>
                    <td>{call.userType === 'Guest' ? call.guestEmail : call.customerEmail}</td>
                    <td>{call.userType === 'Guest' ? call.guestPhone : call.customerPhone}</td>
                    <td>{call.userType}</td>
                    <td>{call.timeSlot}</td>
                    <td>{call.subject}</td>
                    <td>
                      <button 
                        className={`status-button ${call.status.toLowerCase()}`} 
                        onClick={() => handleResolve(call)}
                      >
                        {call.status}
                      </button>
                    </td>
                    <td>
                      <button className="view-button" onClick={() => handleView(call)}>View</button>
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
        contentLabel="Call Detail Modal"
        className="modal-grivences"
        overlayClassName="modal-overlay-grivences"
      >
        <h2>Call Detail</h2>
        <p>Reason: {modalContent.subject}</p>
        <p>Status: {modalContent.status}</p>
        <button className="cancel-button" onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default CSRDashboard;
