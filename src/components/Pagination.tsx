import React from 'react';
import ReactPaginate from 'react-paginate';
import { PaginationProps } from '../types';

const Pagination: React.FC<PaginationProps> = ({
  maxnum,
  activenum,
  handleClick,
}) => {
  const forcePageActive = activenum - 1;

  const handlePageClick = (e: { selected: number }) => {
    let pageNo = e.selected + 1;
    handleClick(pageNo);
    window.scrollTo(0, 0);
  };

  return (
    <div className='flex justify-center my-10'>
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        pageCount={maxnum}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={
          'flex bg-gray-800 shadow-lg rounded-lg space-x-2 px-16 py-4'
        }
        pageClassName={'flex'}
        pageLinkClassName={
          'flex items-center justify-center text-lg w-12 h-12 bg-blue-700 border border-blue-600 rounded-full text-gray-300 hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out'
        }
        previousClassName={'flex'}
        previousLinkClassName={
          'flex items-center justify-center text-lg w-12 h-12 bg-green-700 border border-gray-600 rounded-full text-gray-300 hover:bg-green-600 hover:text-white transition duration-300 ease-in-out'
        }
        nextClassName={'flex'}
        nextLinkClassName={
          'flex items-center justify-center text-lg w-12 h-12 bg-green-700 border border-gray-600 rounded-full text-gray-300 hover:bg-green-600 hover:text-white transition duration-300 ease-in-out'
        }
        breakClassName={'flex'}
        breakLinkClassName={
          'flex items-center justify-center text-lg w-12 h-12 bg-gray-700 border border-gray-600 rounded-full text-gray-300 hover:bg-gray-600 hover:text-white transition duration-300 ease-in-out'
        }
        activeClassName={'active'}
        activeLinkClassName={
          'bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow-md'
        }
        renderOnZeroPageCount={null}
        forcePage={forcePageActive}
      />
    </div>
  );
};

export default Pagination;
