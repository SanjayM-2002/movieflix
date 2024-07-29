import React, { useState } from 'react';
import { CreditsSliderProps } from '../types';

const CreditsSlider: React.FC<CreditsSliderProps> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;
  const no_image = '/img_not_available.jpg';

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - itemsPerPage));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(data.length - itemsPerPage, prevIndex + itemsPerPage)
    );
  };

  const visibleItems = data.slice(currentIndex, currentIndex + itemsPerPage);
  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex + itemsPerPage >= data.length;

  return (
    <div className='relative '>
      <h2 className='text-2xl text-center font-semibold mb-4'>
        Co-Star Information
      </h2>
      <div className='flex flex-col items-center '>
        <div className='flex  overflow-x-auto space-x-4 px-4'>
          {visibleItems.map((item, index) => (
            <div key={index} className='flex-none w-40'>
              <img
                src={
                  item.profile_path
                    ? `https://image.tmdb.org/t/p/w300/${item.profile_path}`
                    : no_image
                }
                alt={item.name}
                className='w-full h-60 object-cover rounded-lg'
              />
              <div className='mt-2 text-center text-red-400'>
                <div className='font-bold'>{item.name}</div>
                <div className='text-sm'>{item.known_for_department}</div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex flex-row justify-center gap-4'>
          <button
            onClick={handlePrev}
            disabled={isPrevDisabled}
            className={`p-4 bg-gray-800 text-white rounded-full hover:bg-gray-700 ${
              isPrevDisabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            &lt;
          </button>
          <button
            onClick={handleNext}
            disabled={isNextDisabled}
            className={`p-4 bg-gray-800 text-white rounded-full hover:bg-gray-700 ${
              isNextDisabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreditsSlider;
