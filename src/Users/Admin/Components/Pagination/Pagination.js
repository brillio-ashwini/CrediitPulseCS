// components/Pagination.js
import React from 'react';
import './Pagination.css';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index)}
          disabled={index === currentPage}
          className={index === currentPage ? 'active' : ''}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
