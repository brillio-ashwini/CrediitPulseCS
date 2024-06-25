// Table.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from './Table';

const headers = ['Name', 'Age', 'Location'];
const data = [
  { name: 'John Doe', age: 28, location: 'New York' },
  { name: 'Jane Smith', age: 34, location: 'San Francisco' },
];

const renderRow = (row, index) => (
  <tr key={index}>
    <td>{row.name}</td>
    <td>{row.age}</td>
    <td>{row.location}</td>
  </tr>
);

describe('Table Component', () => {
  test('renders table headers correctly', () => {
    render(<Table headers={headers} data={[]} renderRow={renderRow} />);
    
    headers.forEach(header => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  test('renders no data message when data is empty', () => {
    render(<Table headers={headers} data={[]} renderRow={renderRow} />);
    
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  test('renders data rows correctly', () => {
    render(<Table headers={headers} data={data} renderRow={renderRow} />);
    
    data.forEach(row => {
      expect(screen.getByText(row.name)).toBeInTheDocument();
      expect(screen.getByText(row.age)).toBeInTheDocument();
      expect(screen.getByText(row.location)).toBeInTheDocument();
    });
  });
});
