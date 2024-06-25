import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Modal from 'react-modal';

// Mock react-modal
jest.mock('react-modal', () => ({
  setAppElement: jest.fn(),
}));

// Mock reportWebVitals
jest.mock('./reportWebVitals', () => jest.fn());

describe('index.js', () => {
  let rootContainer;

  // Setup the #root element before each test
  beforeEach(() => {
    rootContainer = document.createElement('div');
    rootContainer.setAttribute('id', 'root');
    document.body.appendChild(rootContainer);
    jest.spyOn(ReactDOM, 'createRoot').mockImplementation(() => ({
      render: jest.fn(),
    }));
  });

  // Cleanup the #root element after each test
  afterEach(() => {
    document.body.removeChild(rootContainer);
    jest.restoreAllMocks();
  });

  it('renders without crashing', () => {
    require('./index.js');
    expect(ReactDOM.createRoot).toHaveBeenCalledWith(rootContainer);
  });

//   it('calls reportWebVitals', () => {
//     const reportWebVitalsMock = require('./reportWebVitals');
//     require('./index.js');
//     expect(reportWebVitalsMock).toHaveBeenCalled();
//   });
});




