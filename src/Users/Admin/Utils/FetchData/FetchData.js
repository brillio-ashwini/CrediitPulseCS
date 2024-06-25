// utils/fetchData.js
import axios from 'axios';

export const fetchData = async (url, setData, setTotalPages) => {
  try {
    const response = await axios.get(url);
    setData(response.data.content);
    setTotalPages(response.data.totalPages);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
