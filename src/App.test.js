import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import LandingPage from './Users/Home/LandingPage';
import Login from './Users/Home/Login';
import AdminDashboard from './Users/Admin/Pages/Dashboard/AdminDashboard';
import GuestApplications from './Users/Admin/Pages/List/GuestApplications';
import GuestApplicationDetailView from './Users/Admin/Pages/Details/GuestApplicationDetailView';
import CustomerApplication from './Users/Admin/Pages/List/CustomerApplications';
import CustomerApplicationDetailView from './Users/Admin/Pages/Details/CustomerApplicationDetailView';
import CustomerCardUpgradeApplications from './Users/Admin/Pages/List/CustomerCardUpgradeApplications';
import CustomerCardUpgradeApplicationDetailView from './Users/Admin/Pages/Details/CustomerCardUpgradeApplicationDetailView';
import Customers from './Users/Admin/Pages/List/Customers';
import CustomerDetailView from './Users/Admin/Pages/Details/CustomerDetailView';
import Grievances from './Users/CSR/Grievances/Grievances';
import CSRDashboard from './Users/CSR/Pages/Dashboard/CSRDashboard';

jest.mock('./Users/Home/LandingPage', () => () => <div>Landing Page</div>);
jest.mock('./Users/Home/Login', () => () => <div>Login Page</div>);
jest.mock('./Users/Admin/Pages/Dashboard/AdminDashboard', () => () => <div>Admin Dashboard</div>);
jest.mock('./Users/Admin/Pages/List/GuestApplications', () => () => <div>Guest Applications</div>);
jest.mock('./Users/Admin/Pages/Details/GuestApplicationDetailView', () => () => <div>Guest Application Detail View</div>);
jest.mock('./Users/Admin/Pages/List/CustomerApplications', () => () => <div>Customer Applications</div>);
jest.mock('./Users/Admin/Pages/Details/CustomerApplicationDetailView', () => () => <div>Customer Application Detail View</div>);
jest.mock('./Users/Admin/Pages/List/CustomerCardUpgradeApplications', () => () => <div>Customer Card Upgrade Applications</div>);
jest.mock('./Users/Admin/Pages/Details/CustomerCardUpgradeApplicationDetailView', () => () => <div>Customer Card Upgrade Application Detail View</div>);
jest.mock('./Users/Admin/Pages/List/Customers', () => () => <div>Customers</div>);
jest.mock('./Users/Admin/Pages/Details/CustomerDetailView', () => () => <div>Customer Detail View</div>);
jest.mock('./Users/CSR/Grievances/Grievances', () => () => <div>Grievances</div>);
jest.mock('./Users/CSR/Pages/Dashboard/CSRDashboard', () => () => <div>CSR Dashboard</div>);

describe('App Component', () => {
  const renderWithRouter = (initialEntries) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login/:userType" element={<Login />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/pendingguestapplications" element={<GuestApplications />} />
          <Route path="/admin/guestapplicationdetailview" element={<GuestApplicationDetailView />} />
          <Route path="/admin/pendingcustomerapplications" element={<CustomerApplication />} />
          <Route path="/admin/customerapplicationdetailview" element={<CustomerApplicationDetailView />} />
          <Route path="/admin/pendingcustomerupgradeapplications" element={<CustomerCardUpgradeApplications />} />
          <Route path="/admin/customerupgradeapplicationdetailview" element={<CustomerCardUpgradeApplicationDetailView />} />
          <Route path="/admin/allcustomers" element={<Customers />} />
          <Route path="/admin/customerdetail" element={<CustomerDetailView />} />
          <Route path="/csr/grievances" element={<Grievances />} />
          <Route path="/csr/schedule-calls" element={<CSRDashboard />} />
        </Routes>
      </MemoryRouter>
    );
  };

  test('renders LandingPage for root route', () => {
    renderWithRouter(['/']);
    expect(screen.getByText('Landing Page')).toBeInTheDocument();
  });

  test('renders Login page for /login/admin route', () => {
    renderWithRouter(['/login/admin']);
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  test('renders AdminDashboard for /admin/dashboard route', () => {
    renderWithRouter(['/admin/dashboard']);
    expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
  });

  test('renders GuestApplications for /admin/pendingguestapplications route', () => {
    renderWithRouter(['/admin/pendingguestapplications']);
    expect(screen.getByText('Guest Applications')).toBeInTheDocument();
  });

  test('renders GuestApplicationDetailView for /admin/guestapplicationdetailview route', () => {
    renderWithRouter(['/admin/guestapplicationdetailview']);
    expect(screen.getByText('Guest Application Detail View')).toBeInTheDocument();
  });

  test('renders CustomerApplication for /admin/pendingcustomerapplications route', () => {
    renderWithRouter(['/admin/pendingcustomerapplications']);
    expect(screen.getByText('Customer Applications')).toBeInTheDocument();
  });

  test('renders CustomerApplicationDetailView for /admin/customerapplicationdetailview route', () => {
    renderWithRouter(['/admin/customerapplicationdetailview']);
    expect(screen.getByText('Customer Application Detail View')).toBeInTheDocument();
  });

  test('renders CustomerCardUpgradeApplications for /admin/pendingcustomerupgradeapplications route', () => {
    renderWithRouter(['/admin/pendingcustomerupgradeapplications']);
    expect(screen.getByText('Customer Card Upgrade Applications')).toBeInTheDocument();
  });

  test('renders CustomerCardUpgradeApplicationDetailView for /admin/customerupgradeapplicationdetailview route', () => {
    renderWithRouter(['/admin/customerupgradeapplicationdetailview']);
    expect(screen.getByText('Customer Card Upgrade Application Detail View')).toBeInTheDocument();
  });

  test('renders Customers for /admin/allcustomers route', () => {
    renderWithRouter(['/admin/allcustomers']);
    expect(screen.getByText('Customers')).toBeInTheDocument();
  });

  test('renders CustomerDetailView for /admin/customerdetail route', () => {
    renderWithRouter(['/admin/customerdetail']);
    expect(screen.getByText('Customer Detail View')).toBeInTheDocument();
  });

  test('renders Grievances for /csr/grievances route', () => {
    renderWithRouter(['/csr/grievances']);
    expect(screen.getByText('Grievances')).toBeInTheDocument();
  });

  test('renders CSRDashboard for /csr/schedule-calls route', () => {
    renderWithRouter(['/csr/schedule-calls']);
    expect(screen.getByText('CSR Dashboard')).toBeInTheDocument();
  });
});
