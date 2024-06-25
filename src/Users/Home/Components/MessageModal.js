// components/MessageModal.js
import React from 'react';
import Modal from 'react-modal';
import './MessageModal.css';

Modal.setAppElement('#root'); 

const MessageModal = ({ isOpen, onRequestClose, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Message Modal"
      className="modal-login"
      overlayClassName="overlay-login"
    >
      <h2>{message}</h2>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default MessageModal;
