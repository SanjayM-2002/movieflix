import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { currentPageState } from '../atoms/currentPageState';
import { Page } from '../types';

const navItems = [
  { name: 'Home', link: '/' },
  { name: 'Movies', link: '/movies' },
  { name: 'TvSeries', link: '/tv-series' },
  { name: 'Search', link: '/search' },
];

const Appbar: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);

  const handleNavigation = (item: Page) => {
    setCurrentPage(item);
    navigate(item.link);
  };

  return (
    <div className='bg-gray-800 p-4 flex justify-around items-center'>
      <div className='text-white text-2xl font-bold'>Mflix</div>
      <div className='flex space-x-4'>
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => handleNavigation(item)}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              currentPage.name === item.name
                ? 'bg-gray-700 text-blue-200 font-bold'
                : 'text-white hover:bg-gray-700 hover:text-red-400'
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Appbar;
