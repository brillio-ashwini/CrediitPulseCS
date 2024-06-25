import axios from 'axios';

export const handleAdminLogin = async (loginRequest) => {
  try {
    const response = await axios.post('http://localhost:3550/admin/login', loginRequest);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data || 'Error logging in admin');
  }
};

export const handleCSRLogin = async (loginRequest) => {
  try {
    const response = await axios.post('http://localhost:3553/customersupport/customerservice/login', loginRequest);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data || 'Error logging in CSR');
  }
};
