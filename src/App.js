
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GuestApplications from './Users/Admin/Pages/List/GuestApplications';
import GuestApplicationDetailView from './Users/Admin/Pages/Details/GuestApplicationDetailView';
import CustomerApplication from './Users/Admin/Pages/List/CustomerApplications';
import CustomerApplicationDetailView from './Users/Admin/Pages/Details/CustomerApplicationDetailView';
import CustomerCardUpgradeApplications from './Users/Admin/Pages/List/CustomerCardUpgradeApplications';
import CustomerCardUpgradeApplicationDetailView from './Users/Admin/Pages/Details/CustomerCardUpgradeApplicationDetailView';
import Customers from './Users/Admin/Pages/List/Customers';
import CustomerDetailView from './Users/Admin/Pages/Details/CustomerDetailView';
import AdminDashboard from './Users/Admin/Pages/Dashboard/AdminDashboard';

import Login from './Users/Home/Login';
import LandingPage from './Users/Home/LandingPage'
import Grievances from './Users/CSR/Grievances/Grievances';
import CSRDashboard from './Users/CSR/Pages/Dashboard/CSRDashboard';


function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="content-container">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login/:userType" element={<Login />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/pendingguestapplications" element={<GuestApplications />} />
            <Route path="/admin/guestapplicationdetailview" element={<GuestApplicationDetailView />} />
            <Route path="/admin/pendingcustomerapplications" element={<CustomerApplication />} />
            <Route path="/admin/customerapplicationdetailview" element={<CustomerApplicationDetailView />} />
            <Route path="/admin/pendingcustomerupgradeapplications" element={<CustomerCardUpgradeApplications/>} />
            <Route path="/admin/customerupgradeapplicationdetailview" element={<CustomerCardUpgradeApplicationDetailView />} />
            <Route path="/admin/allcustomers" element={<Customers />} />
            <Route path="/admin/customerdetail" element={<CustomerDetailView />} />


            <Route path="/csr/grievances" element={<Grievances/>} />
            <Route path="/csr/schedule-calls" element={<CSRDashboard/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
