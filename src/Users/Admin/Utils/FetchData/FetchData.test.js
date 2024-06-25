import axios from 'axios';
import { fetchData } from './FetchData'

jest.mock('axios');

describe('fetchData', () => {
  let setDataMock;
  let setTotalPagesMock;

  beforeEach(() => {
    setDataMock = jest.fn();
    setTotalPagesMock = jest.fn();
  });

  it('fetches data successfully and sets data and total pages', async () => {
    const mockResponse = {
      data: {
        content: [{ id: 1, name: 'Test' }, { id: 2, name: 'Test 2' }],
        totalPages: 3,
      },
    };
    axios.get.mockResolvedValue(mockResponse);

    await fetchData('http://localhost:3550/test', setDataMock, setTotalPagesMock);

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3550/test');
    expect(setDataMock).toHaveBeenCalledWith(mockResponse.data.content);
    expect(setTotalPagesMock).toHaveBeenCalledWith(mockResponse.data.totalPages);
  });

  it('handles error when fetching data', async () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
    const mockError = new Error('Network Error');
    axios.get.mockRejectedValue(mockError);

    await fetchData('http://localhost:3550/test', setDataMock, setTotalPagesMock);

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3550/test');
    expect(consoleErrorMock).toHaveBeenCalledWith('Error fetching data:', mockError);
    expect(setDataMock).not.toHaveBeenCalled();
    expect(setTotalPagesMock).not.toHaveBeenCalled();

    consoleErrorMock.mockRestore();
  });
});
