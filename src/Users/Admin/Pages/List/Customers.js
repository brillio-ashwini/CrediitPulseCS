// pages/CustomerList.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Table from '../../Components/Table/Table';
import Pagination from '../../Components/Pagination/Pagination';
import { fetchData } from '../../Utils/FetchData/FetchData';
import '../../CSS/AdminStyle.css';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [activeItem, setActiveItem] = useState('All Customers');
  const pageSize = 9;
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(`http://localhost:3550/admin/customer/readall?page=${page}&size=${pageSize}`, setCustomers, setTotalPages);
  }, [page]);

  const handleLogout = () => {
    navigate('/');
  };

  const handleView = (customer) => {
    navigate('/admin/customerdetail', { state: { customer, activeItem: 'All Customers' } });
  };

  const renderRow = (customer) => (
    <tr key={customer.customerId}>
      <td>{customer.customerId}</td>
      <td>{customer.name}</td>
      <td>{customer.email}</td>
      <td>{customer.mobileNumber}</td>
      <td className="actions">
        <button className="view-button" onClick={() => handleView(customer)}>View</button>
      </td>
    </tr>
  );

  return (
    <div className="dashboard-container">
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} handleLogout={handleLogout} />
      <div className="main-content">
        <div className="table-container">
          <h3>Customers</h3>
          <Table
            headers={['Customer ID', 'Name', 'Email', 'Phone Number', 'Actions']}
            data={customers}
            renderRow={renderRow}
          />
          <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
};

export default Customers;
