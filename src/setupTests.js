// import '@testing-library/jest-dom';
// import '@testing-library/jest-dom/extend-expect';
// import Modal from 'react-modal';

// // Create a root div and append it to the document body
// const root = document.createElement('div');
// root.id = 'root';
// document.body.appendChild(root);

// // Set the app element for react-modal
// Modal.setAppElement('#root');

// setupTests.js
import '@testing-library/jest-dom';
import Modal from 'react-modal';

// Create a root div and append it to the document body
const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

// Set the app element for react-modal
Modal.setAppElement('#root');

