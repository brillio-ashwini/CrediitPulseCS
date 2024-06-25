// Pagination.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination Component', () => {
  const totalPages = 5;
  const currentPage = 2;
  const onPageChange = jest.fn();

  beforeEach(() => {
    render(<Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange} />);
  });

  test('renders the correct number of page buttons', () => {
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(totalPages);
  });

  test('disables the current page button', () => {
    const currentPageButton = screen.getByText((currentPage + 1).toString());
    expect(currentPageButton).toBeDisabled();
  });

  test('highlights the current page button', () => {
    const currentPageButton = screen.getByText((currentPage + 1).toString());
    expect(currentPageButton).toHaveClass('active');
  });

  test('calls onPageChange with the correct page index when a button is clicked', () => {
    const pageIndex = 3;
    const button = screen.getByText((pageIndex + 1).toString());
    fireEvent.click(button);
    expect(onPageChange).toHaveBeenCalledWith(pageIndex);
  });
});
