import React from 'react';
import { MovieCardProps } from '../types';
import { Link } from 'react-router-dom';
import { currentPageState } from '../atoms/currentPageState';
import { useRecoilValue } from 'recoil';

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const currentPage = useRecoilValue(currentPageState);
  const title = data.original_title || data.name;
  const id = data.id;
  const img_not_available = '/img_not_available.jpg';
  const baseImageUrl = 'https://image.tmdb.org/t/p/w300';
  const ImageURL = data.poster_path
    ? baseImageUrl + data.poster_path
    : img_not_available;
  const media_type = data.media_type
    ? data.media_type
    : data.type
    ? data.type
    : currentPage.name === 'TvSeries'
    ? 'tv'
    : 'movie';
  const release_date = data.release_date || data.first_air_date;
  const vote_average = parseInt(data.vote_average?.toString() || '0', 10);
  const original_language = data.original_language || '';
  console.log('media type is: ', media_type);

  return (
    <div className='relative justify-center items-center w-full bg-black border border-gray-800 rounded-lg overflow-hidden shadow-lg hover:cursor-pointer'>
      <Link
        to={`/details/${id}/${media_type}`}
        className='block text-white hover:text-white'
      >
        <figure className='relative justify-center'>
          <img
            src={ImageURL}
            alt={title}
            className='w-[90vh] h-80 object-fit transition-opacity duration-300 ease-in-out hover:opacity-80'
          />
          <div className='absolute bottom-2 right-2 w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full'>
            <div className='relative w-full h-full flex items-center justify-center'>
              <svg
                className='w-full h-full transform rotate-[-90deg] origin-center'
                viewBox='0 0 30 30'
                xmlns='http://www.w3.org/2000/svg'
              >
                <circle
                  className='circle-chart__background'
                  stroke='#2f3439'
                  strokeWidth='2'
                  fill='none'
                  cx='15'
                  cy='15'
                  r='14'
                ></circle>
                <circle
                  className='circle-chart__circle'
                  stroke='#4eb04b'
                  strokeWidth='2'
                  strokeDasharray={`${vote_average * 10},100`}
                  cx='15'
                  cy='15'
                  r='14'
                ></circle>
              </svg>
              <b className='absolute text-white text-xs font-bold'>
                {vote_average}
              </b>
            </div>
          </div>
          <div className='absolute bottom-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded'>
            {media_type}
            <b className='ml-2 bg-white text-black px-1 rounded'>
              {original_language}
            </b>
          </div>
          <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-60'></div>
        </figure>
        <div className='p-4'>
          <div className='flex items-center mb-2'>
            <ul className='text-xs text-red-500'>
              <li className='inline-block mr-2'>Release Date:</li>
            </ul>
            <small className='text-xs'>{release_date}</small>
          </div>
          <h3 className='text-lg text-slate-50 font-semibold hover:underline'>
            {title}
          </h3>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
