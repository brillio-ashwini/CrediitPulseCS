import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../CSS/AdminStyle.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "@fortawesome/fontawesome-free/css/all.min.css";

const AdminDashboard = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const navigate = useNavigate();

  const [customerApplicationsCount, setCustomerApplicationsCount] = useState(0);
  const [
    customerPendingApplicationsCount,
    setCustomerPendingApplicationsCount,
  ] = useState(0);
  const [
    customerApprovedApplicationsCount,
    setCustomerApprovedApplicationsCount,
  ] = useState(0);
  const [guestApplicationsCount, setGuestApplicationsCount] = useState(0);
  const [guestPendingApplicationsCount, setGuestPendingApplicationsCount] =
    useState(0);
  const [guestApprovedApplicationsCount, setGuestApprovedApplicationsCount] =
    useState(0);

  const handleLogout = () => {
    navigate("/");
  };
  useEffect(() => {
    axios
      .get("http://localhost:3550/admin/customerapplication/getcount")
      .then((response) => {
        setCustomerApplicationsCount(response.data);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the customer applications count!",
          error
        );
      });
    axios
      .get("http://localhost:3550/admin/customerapplication/pendinggetcount")
      .then((response) => {
        setCustomerPendingApplicationsCount(response.data);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the customer applications count!",
          error
        );
      });
    axios
      .get("http://localhost:3550/admin/customerapplication/approvedgetcount")
      .then((response) => {
        setCustomerApprovedApplicationsCount(response.data);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the customer applications count!",
          error
        );
      });

    axios
      .get("http://localhost:3550/admin/guestapplication/getcount")
      .then((response) => {
        setGuestApplicationsCount(response.data);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the customer applications count!",
          error
        );
      });
    axios
      .get("http://localhost:3550/admin/guestapplication/pendinggetcount")
      .then((response) => {
        setGuestPendingApplicationsCount(response.data);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the customer applications count!",
          error
        );
      });
    axios
      .get("http://localhost:3550/admin/guestapplication/approvedgetcount")
      .then((response) => {
        setGuestApprovedApplicationsCount(response.data);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the customer applications count!",
          error
        );
      });
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        handleLogout={handleLogout}
      />
      <div className="main-content">
        <div className="cards-container">
          <div className="card">
            <i className="fas fa-users"></i>
            <h3>Guest Applications</h3>
            <p>{guestApplicationsCount}</p>
          </div>
          <div className="card">
            <i className="fas fa-check-circle"></i>
            <h3>Resolved</h3>
            <p>{guestApprovedApplicationsCount}</p>
          </div>
          <div className="card">
            <i className="fas fa-hourglass-half"></i>
            <h3>Pending</h3>
            <p>{guestPendingApplicationsCount}</p>
          </div>
        </div>
        <div className="cards-container">
          <div className="card">
            <i className="fas fa-users"></i>
            <h3>Customer Applications</h3>
            <p>{customerApplicationsCount}</p>
          </div>
          <div className="card">
            <i className="fas fa-check-circle"></i>
            <h3>Resolved</h3>
            <p>{customerApprovedApplicationsCount}</p>
          </div>
          <div className="card">
            <i className="fas fa-hourglass-half"></i>
            <h3>Pending</h3>
            <p>{customerPendingApplicationsCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
