// reportWebVitals.test.js
import reportWebVitals from './reportWebVitals';

// Mock the web-vitals module and its methods
jest.mock('web-vitals', () => ({
  getCLS: jest.fn(),
  getFID: jest.fn(),
  getFCP: jest.fn(),
  getLCP: jest.fn(),
  getTTFB: jest.fn(),
}));

describe('reportWebVitals', () => {
  const { getCLS, getFID, getFCP, getLCP, getTTFB } = require('web-vitals');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // it('should call web-vitals methods with onPerfEntry when it is a function', async () => {
  //   const onPerfEntry = jest.fn();

  //   // Simulate the import of web-vitals module
  //   await import('web-vitals');

  //   reportWebVitals(onPerfEntry);

  //   expect(getCLS).toHaveBeenCalledWith(onPerfEntry);
  //   expect(getFID).toHaveBeenCalledWith(onPerfEntry);
  //   expect(getFCP).toHaveBeenCalledWith(onPerfEntry);
  //   expect(getLCP).toHaveBeenCalledWith(onPerfEntry);
  //   expect(getTTFB).toHaveBeenCalledWith(onPerfEntry);
  // });

  it('should not call web-vitals methods when onPerfEntry is not a function', () => {
    const invalidValues = [null, undefined, 123, "string"];

    invalidValues.forEach(value => {
      reportWebVitals(value);
    });

    expect(getCLS).not.toHaveBeenCalled();
    expect(getFID).not.toHaveBeenCalled();
    expect(getFCP).not.toHaveBeenCalled();
    expect(getLCP).not.toHaveBeenCalled();
    expect(getTTFB).not.toHaveBeenCalled();
  });
});

