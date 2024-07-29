import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Pagination from '../../components/Pagination';

type PaginationProps = {
  maxnum: number;
  activenum: number;
  handleClick: (pageNo: number) => void;
};

describe('Pagination Component', () => {
  it('renders correctly with the provided props', () => {
    const handleClick = vi.fn();
    const props: PaginationProps = {
      maxnum: 5,
      activenum: 1,
      handleClick,
    };

    render(<Pagination {...props} />);

    expect(screen.getByText('<')).toBeInTheDocument();
    expect(screen.getByText('>')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('calls handleClick when a page number is clicked', () => {
    const handleClick = vi.fn();
    const props: PaginationProps = {
      maxnum: 5,
      activenum: 1,
      handleClick,
    };

    render(<Pagination {...props} />);
    fireEvent.click(screen.getByText('2'));

    expect(handleClick).toHaveBeenCalledWith(2);
  });

  it('calls handleClick with the correct page number when navigating with buttons', () => {
    const handleClick = vi.fn();
    const props: PaginationProps = {
      maxnum: 5,
      activenum: 1,
      handleClick,
    };

    render(<Pagination {...props} />);
    fireEvent.click(screen.getByText('>')); // Clicking next button

    expect(handleClick).toHaveBeenCalledWith(2);
  });

  it('does not call handleClick when the previous button is clicked on the first page', () => {
    const handleClick = vi.fn();
    const props: PaginationProps = {
      maxnum: 5,
      activenum: 1,
      handleClick,
    };

    render(<Pagination {...props} />);
    fireEvent.click(screen.getByText('<'));

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('does not call handleClick when the next button is clicked on the last page', () => {
    const handleClick = vi.fn();
    const props: PaginationProps = {
      maxnum: 5,
      activenum: 5,
      handleClick,
    };

    render(<Pagination {...props} />);
    fireEvent.click(screen.getByText('>'));

    expect(handleClick).not.toHaveBeenCalled();
  });
});
