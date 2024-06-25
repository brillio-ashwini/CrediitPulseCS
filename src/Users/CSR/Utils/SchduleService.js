import axios from 'axios';

const API_URL = 'http://localhost:3553/customersupport';

export const getCustomerScheduleCalls = () => {
  return axios.get(`${API_URL}/customerschedulecall/readall`);
};

export const getGuestScheduleCalls = () => {
  return axios.get(`${API_URL}/guestschedulecall/readall`);
};

export const getGuestScheduleCallsPending = () => {
  return axios.get(`${API_URL}/guestschedulecall/readallpending`);
};

export const getCustomerScheduleCallsPending = () => {
  return axios.get(`${API_URL}/customerschedulecall/readallpending`);
};

export const resolveCustomerScheduleCall = (id) => {
  return axios.put(`${API_URL}/customerschedulecall/resolve/${id}`);
};

export const resolveGuestScheduleCall = (id) => {
  return axios.put(`${API_URL}/guestschedulecall/resolve/${id}`);
};

//grivences

export const getCustomerGrievances = () => {
  return axios.get(`${API_URL}/customergrievance/readall`);
};

export const getGuestGrievances = () => {
  return axios.get(`${API_URL}/guestgrievance/readall`);
};

export const getCustomerGrievancesPending = () => {
  return axios.get(`${API_URL}/customergrievance/readallpending`);
};

export const getGuestGrievancesPending = () => {
  return axios.get(`${API_URL}/guestgrievance/readallpending`);
};

export const resolveCustomerGrievance = (grievanceId, message) => {
  return axios.put(`${API_URL}/customergrievance/resolve/${grievanceId}`, { message });
};

export const resolveGuestGrievance = (grievanceId, message) => {
  return axios.put(`${API_URL}/guestgrievance/resolve/${grievanceId}`, { message });
};