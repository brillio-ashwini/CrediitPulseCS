import React from 'react';
import './Table.css';

const Table = ({ headers, data, renderRow }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {headers.map(header => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={headers.length}>No data available</td>
          </tr>
        ) : (
          data.map((row, index) => renderRow(row, index))
        )}
      </tbody>
    </table>
  );
};

export default Table;
