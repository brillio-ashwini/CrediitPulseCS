// // MessageModal.test.js
// import React from 'react';
// import { render, fireEvent, screen } from '@testing-library/react';
// import MessageModal from './MessageModal';

// describe('MessageModal', () => {
//   const onRequestClose = jest.fn();
//   const message = 'This is a test message';

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   test('renders the modal when isOpen is true', () => {
//     render(
//       <MessageModal isOpen={true} onRequestClose={onRequestClose} message={message} />
//     );

//     expect(screen.getByText(message)).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
//   });

//   test('does not render the modal when isOpen is false', () => {
//     render(
//       <MessageModal isOpen={false} onRequestClose={onRequestClose} message={message} />
//     );

//     expect(screen.queryByText(message)).not.toBeInTheDocument();
//     expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
//   });

//   test('calls onRequestClose when the close button is clicked', () => {
//     render(
//       <MessageModal isOpen={true} onRequestClose={onRequestClose} message={message} />
//     );

//     const closeButton = screen.getByRole('button', { name: /close/i });
//     fireEvent.click(closeButton);

//     expect(onRequestClose).toHaveBeenCalledTimes(1);
//   });

//   test('calls onRequestClose when the overlay is clicked', () => {
//     render(
//       <MessageModal isOpen={true} onRequestClose={onRequestClose} message={message} />
//     );

//     const overlay = document.querySelector('.overlay-login');
//     fireEvent.click(overlay);

//     expect(onRequestClose).toHaveBeenCalledTimes(1);
//   });
// });

// MessageModal.test.js
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import MessageModal from './MessageModal';

describe('MessageModal', () => {
  const onRequestClose = jest.fn();
  const message = 'This is a test message';

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the modal when isOpen is true', () => {
    render(
      <MessageModal isOpen={true} onRequestClose={onRequestClose} message={message} />
    );

    expect(screen.getByText(message)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  test('does not render the modal when isOpen is false', () => {
    render(
      <MessageModal isOpen={false} onRequestClose={onRequestClose} message={message} />
    );

    expect(screen.queryByText(message)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
  });

  test('calls onRequestClose when the close button is clicked', () => {
    render(
      <MessageModal isOpen={true} onRequestClose={onRequestClose} message={message} />
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(onRequestClose).toHaveBeenCalledTimes(1);
  });

  test('calls onRequestClose when the overlay is clicked', () => {
    render(
      <MessageModal isOpen={true} onRequestClose={onRequestClose} message={message} />
    );

    const overlay = document.querySelector('.overlay-login');
    fireEvent.click(overlay);

    expect(onRequestClose).toHaveBeenCalledTimes(1);
  });
});





