import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import Spinner from '../components/Spinner';
import { MovieData } from '../types';

const Home: React.FC = () => {
  const [content, setContent] = useState<MovieData[]>([]);
  const [pageno, setPageno] = useState(1);
  const [paginationno, setPaginationno] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const fetchTrendingData = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${BASE_URL}/trending/all/day?api_key=${API_KEY}&page=${pageno}`
      );
      setContent(data.results);
      setPaginationno(data.total_pages);
    } catch (error) {
      console.error('Error fetching trending data:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTrendingData();
  }, [pageno]);

  const handleClick = (number: number) => {
    setPageno(number);
  };

  return (
    <main className='homePage p-4'>
      <div className='text-center'>
        <section>
          <h1 className='text-3xl font-bold'>Top Trending</h1>
          <h3 className='text-xl text-gray-500'>TV and Movies For You</h3>
        </section>
      </div>
      {isLoading ? (
        <div className='flex justify-center mt-10'>
          <Spinner />
        </div>
      ) : (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8'>
            {content && content.length > 0 ? (
              content.map((item, index) => (
                <MovieCard key={index} data={item} />
              ))
            ) : (
              <p>No results</p>
            )}
          </div>
          {paginationno && paginationno > 1 && (
            <Pagination
              maxnum={paginationno}
              activenum={pageno}
              handleClick={handleClick}
            />
          )}
        </>
      )}
    </main>
  );
};

export default Home;
