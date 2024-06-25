import axios from 'axios';
import {
  getCustomerScheduleCalls,
  getGuestScheduleCalls,
  getGuestScheduleCallsPending,
  getCustomerScheduleCallsPending,
  getCustomerGrievances,
  getGuestGrievances,
  getCustomerGrievancesPending,
  getGuestGrievancesPending,
  resolveCustomerScheduleCall,
  resolveGuestScheduleCall,
  resolveCustomerGrievance,
  resolveGuestGrievance
} from './SchduleService';

jest.mock('axios');

const API_URL = 'http://localhost:3553/customersupport';

describe('SchduleService API Calls', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getCustomerScheduleCalls', async () => {
    axios.get.mockResolvedValue({ data: 'mockData' });

    const response = await getCustomerScheduleCalls();
    expect(response.data).toBe('mockData');
    expect(axios.get).toHaveBeenCalledWith(`${API_URL}/customerschedulecall/readall`);
  });

  test('getGuestScheduleCalls', async () => {
    axios.get.mockResolvedValue({ data: 'mockData' });

    const response = await getGuestScheduleCalls();
    expect(response.data).toBe('mockData');
    expect(axios.get).toHaveBeenCalledWith(`${API_URL}/guestschedulecall/readall`);
  });

  test('getGuestScheduleCallsPending', async () => {
    axios.get.mockResolvedValue({ data: 'mockData' });

    const response = await getGuestScheduleCallsPending();
    expect(response.data).toBe('mockData');
    expect(axios.get).toHaveBeenCalledWith(`${API_URL}/guestschedulecall/readallpending`);
  });

  test('getCustomerScheduleCallsPending', async () => {
    axios.get.mockResolvedValue({ data: 'mockData' });

    const response = await getCustomerScheduleCallsPending();
    expect(response.data).toBe('mockData');
    expect(axios.get).toHaveBeenCalledWith(`${API_URL}/customerschedulecall/readallpending`);
  });

  test('getCustomerGrievances', async () => {
    axios.get.mockResolvedValue({ data: 'mockData' });

    const response = await getCustomerGrievances();
    expect(response.data).toBe('mockData');
    expect(axios.get).toHaveBeenCalledWith(`${API_URL}/customergrievance/readall`);
  });

  test('getGuestGrievances', async () => {
    axios.get.mockResolvedValue({ data: 'mockData' });

    const response = await getGuestGrievances();
    expect(response.data).toBe('mockData');
    expect(axios.get).toHaveBeenCalledWith(`${API_URL}/guestgrievance/readall`);
  });

  test('getCustomerGrievancesPending', async () => {
    axios.get.mockResolvedValue({ data: 'mockData' });

    const response = await getCustomerGrievancesPending();
    expect(response.data).toBe('mockData');
    expect(axios.get).toHaveBeenCalledWith(`${API_URL}/customergrievance/readallpending`);
  });

  test('getGuestGrievancesPending', async () => {
    axios.get.mockResolvedValue({ data: 'mockData' });

    const response = await getGuestGrievancesPending();
    expect(response.data).toBe('mockData');
    expect(axios.get).toHaveBeenCalledWith(`${API_URL}/guestgrievance/readallpending`);
  });

  test('resolveCustomerScheduleCall', async () => {
    axios.put.mockResolvedValue({ data: 'mockData' });

    const response = await resolveCustomerScheduleCall('1');
    expect(response.data).toBe('mockData');
    expect(axios.put).toHaveBeenCalledWith(`${API_URL}/customerschedulecall/resolve/1`);
  });

  test('resolveGuestScheduleCall', async () => {
    axios.put.mockResolvedValue({ data: 'mockData' });

    const response = await resolveGuestScheduleCall('1');
    expect(response.data).toBe('mockData');
    expect(axios.put).toHaveBeenCalledWith(`${API_URL}/guestschedulecall/resolve/1`);
  });

  test('resolveCustomerGrievance', async () => {
    axios.put.mockResolvedValue({ data: 'mockData' });

    const response = await resolveCustomerGrievance('1', 'test message');
    expect(response.data).toBe('mockData');
    expect(axios.put).toHaveBeenCalledWith(`${API_URL}/customergrievance/resolve/1`, { message: 'test message' });
  });

  test('resolveGuestGrievance', async () => {
    axios.put.mockResolvedValue({ data: 'mockData' });

    const response = await resolveGuestGrievance('1', 'test message');
    expect(response.data).toBe('mockData');
    expect(axios.put).toHaveBeenCalledWith(`${API_URL}/guestgrievance/resolve/1`, { message: 'test message' });
  });
});
