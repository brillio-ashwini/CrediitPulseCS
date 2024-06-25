
import axios from 'axios';
import { handleAdminLogin, handleCSRLogin } from './LoginService';

jest.mock('axios');

describe('LoginService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('handleAdminLogin', () => {
    const loginRequest = { username: 'admin', password: 'admin123' };

    test('should return response data on successful login', async () => {
      const mockData = { token: 'mockToken' };
      axios.post.mockResolvedValue({ data: mockData });

      const response = await handleAdminLogin(loginRequest);

      expect(response).toEqual(mockData);
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3550/admin/login', loginRequest);
    });

    test('should throw an error with response data on login failure', async () => {
      const mockError = { response: { data: 'Invalid credentials' } };
      axios.post.mockRejectedValue(mockError);

      await expect(handleAdminLogin(loginRequest)).rejects.toThrow('Invalid credentials');
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3550/admin/login', loginRequest);
    });

    test('should throw a generic error if no response data is available', async () => {
      const mockError = { response: { data: '' } }; // Ensure response is an object
      axios.post.mockRejectedValue(mockError);

      await expect(handleAdminLogin(loginRequest)).rejects.toThrow('Error logging in admin');
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3550/admin/login', loginRequest);
    });
  });

  describe('handleCSRLogin', () => {
    const loginRequest = { username: 'csr', password: 'csr123' };

    test('should return response data on successful login', async () => {
      const mockData = { token: 'mockToken' };
      axios.post.mockResolvedValue({ data: mockData });

      const response = await handleCSRLogin(loginRequest);

      expect(response).toEqual(mockData);
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3553/customersupport/customerservice/login', loginRequest);
    });

    test('should throw an error with response data on login failure', async () => {
      const mockError = { response: { data: 'Invalid credentials' } };
      axios.post.mockRejectedValue(mockError);

      await expect(handleCSRLogin(loginRequest)).rejects.toThrow('Invalid credentials');
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3553/customersupport/customerservice/login', loginRequest);
    });

    test('should throw a generic error if no response data is available', async () => {
      const mockError = { response: { data: '' } }; // Ensure response is an object
      axios.post.mockRejectedValue(mockError);

      await expect(handleCSRLogin(loginRequest)).rejects.toThrow('Error logging in CSR');
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3553/customersupport/customerservice/login', loginRequest);
    });
  });
});
