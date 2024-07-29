import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import FilterBox from '../components/FilterBox';
import Spinner from '../components/Spinner';
import { MovieData, Genre } from '../types';
import useGenres from '../hooks/useGenres';

const TvSeries: React.FC = () => {
  const [content, setContent] = useState<MovieData[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [pageno, setPageno] = useState(1);
  const [paginationno, setPaginationno] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const genreforURL = useGenres(selectedGenres);

  const fetchSeriesData = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${BASE_URL}/discover/tv?api_key=${API_KEY}&page=${pageno}&with_genres=${genreforURL}&language=en-US`
      );
      setContent(data.results);
      setPaginationno(data.total_pages);
    } catch (error) {
      console.error('Error fetching series data:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSeriesData();
    return () => {
      setGenres([]);
    };
  }, []);

  useEffect(() => {
    fetchSeriesData();
  }, [pageno, genreforURL]);

  const handleClick = (number: number) => {
    setPageno(number);
  };

  return (
    <main className='moviesPage p-4'>
      <div className='text-center'>
        <section>
          <h1 className='text-3xl font-bold'>Top Trending Series</h1>
          <h3 className='text-xl text-gray-500'>For You</h3>
        </section>
      </div>
      <div className='flex mt-8'>
        <aside className='w-1/4 p-4'>
          <FilterBox
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
            genres={genres}
            setGenres={setGenres}
            type='tv'
            setPage={setPageno}
          />
        </aside>
        {isLoading ? (
          <div className='w-3/4 flex justify-center items-center'>
            <Spinner />
          </div>
        ) : (
          <div className='w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {content && content.length > 0 ? (
              content.map((item, index) => (
                <MovieCard key={index} data={item} />
              ))
            ) : (
              <p>No results</p>
            )}
          </div>
        )}
      </div>
      {paginationno && paginationno > 1 && (
        <Pagination
          maxnum={paginationno}
          activenum={pageno}
          handleClick={handleClick}
        />
      )}
    </main>
  );
};

export default TvSeries;
