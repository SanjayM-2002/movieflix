import React from 'react';
import { SearchBarProps } from '../types';

const SearchBar: React.FC<SearchBarProps> = ({
  searchValue,
  setSearchValue,
  typeValue,
  setTypeValue,
  filterData,
}) => {
  const changeSearchHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const changeValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypeValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    filterData();
  };

  return (
    <div className='bg-gray-800 p-4 rounded-lg shadow-md'>
      <h6 className='text-center mb-4'>
        Type movie or TV show name to find it
      </h6>
      <div className='flex justify-center mb-4'>
        <label className='mr-4'>
          <input
            type='radio'
            value='tv'
            onChange={changeValueHandler}
            checked={typeValue === 'tv'}
            className='mr-2'
          />
          <span>TV</span>
        </label>
        <label>
          <input
            type='radio'
            value='movie'
            onChange={changeValueHandler}
            checked={typeValue === 'movie'}
            className='mr-2'
          />
          <span>Movies</span>
        </label>
      </div>
      <form onSubmit={handleSubmit} className='flex justify-center'>
        <input
          type='search'
          value={searchValue}
          onChange={changeSearchHandle}
          placeholder='Search here'
          className='w-full max-w-xs p-2 border text-blue-500 border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-pink-500'
        />
        <input
          type='submit'
          value='Search'
          className='px-4 py-2 bg-pink-500 text-white font-bold rounded-r-lg hover:bg-pink-600 transition duration-300 ease-in-out cursor-pointer'
        />
      </form>
    </div>
  );
};

export default SearchBar;
