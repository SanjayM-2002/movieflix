import React, { useEffect } from 'react';
import axios from 'axios';
import { BsFillXCircleFill } from 'react-icons/bs';
import { FilterBoxProps, Genre } from '../types';

const FilterBox: React.FC<FilterBoxProps> = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
}) => {
  const API_KEY = import.meta.env.VITE_API_KEY;

  const getDataList = async () => {
    try {
      const {
        data: { genres },
      } = await axios.get(
        `https://api.themoviedb.org/3/genre/${type}/list?api_key=${API_KEY}&language=en-US`
      );
      setGenres(genres);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDataList();
    return () => {
      setGenres([]);
    };
  }, []);

  const handleAdd = (genre: Genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre: Genre) => {
    setSelectedGenres(selectedGenres.filter((g) => g.id !== genre.id));
    setGenres([...genres, genre]);
    setPage(1);
  };

  return (
    <aside className='p-4 bg-gray-800 rounded-lg shadow-md'>
      <h3 className='text-xl font-bold text-white mb-4'>Filter By:</h3>
      <div className='flex flex-col space-y-2'>
        {selectedGenres.map((item) => (
          <div
            key={item.id}
            className='flex items-center justify-between bg-gray-700 text-white px-3 py-2 rounded-lg cursor-pointer'
            onClick={() => handleRemove(item)}
          >
            {item.name}
            <BsFillXCircleFill className='ml-2 text-red-500' />
          </div>
        ))}
        {genres.length > 0 ? (
          genres.map((item) => (
            <div
              key={item.id}
              className='flex items-center justify-between bg-gray-900 text-white px-3 py-2 rounded-lg cursor-pointer'
              onClick={() => handleAdd(item)}
            >
              {item.name}
            </div>
          ))
        ) : (
          <div className='text-gray-400'>Loading content...</div>
        )}
      </div>
    </aside>
  );
};

export default FilterBox;
