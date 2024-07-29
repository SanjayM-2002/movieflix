import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/Searchbar';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import Spinner from '../components/Spinner';

interface SearchPageProps {}

const Search: React.FC<SearchPageProps> = () => {
  const [content, setContent] = useState<any[]>([]);
  const [pageno, setPageno] = useState(1);
  const [paginationno, setPaginationno] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [typeValue, setTypeValue] = useState('movie');
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState({ searchValue: '', typeValue: 'movie' });
  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${BASE_URL}/search/${query.typeValue}?api_key=${API_KEY}&page=${pageno}&language=en-US&query=${query.searchValue}&include_adult=false`
      );
      setContent(data.results);
      setPaginationno(data.total_pages);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (query.searchValue) {
      fetchData();
    }
  }, [query, pageno]);

  const handleSearch = (searchValue: string, typeValue: string) => {
    setPageno(1); // Reset to first page on new search
    setQuery({ searchValue, typeValue });
  };

  const handleClick = (number: number) => {
    setPageno(number);
  };

  return (
    <main className='bg-gray-900 text-white min-h-screen'>
      <div className='container mx-auto py-10'>
        <h1 className='text-center text-3xl font-bold mb-4'>
          Search Movies / TV Series
        </h1>
        <h3 className='text-center text-xl mb-8'>For You</h3>
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          typeValue={typeValue}
          setTypeValue={setTypeValue}
          filterData={() => handleSearch(searchValue, typeValue)}
        />
        {isLoading ? (
          <div className='flex justify-center mt-10'>
            <Spinner />
          </div>
        ) : query.searchValue ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10'>
            {content && content.length > 0
              ? content.map((item, index) => (
                  <MovieCard key={index} data={item} />
                ))
              : 'No results found'}
          </div>
        ) : (
          <div className='flex justify-center mt-10'>
            <p>Type your search keyword and click on the search button.</p>
          </div>
        )}
        {paginationno && paginationno > 1 ? (
          <Pagination
            maxnum={paginationno}
            activenum={pageno}
            handleClick={handleClick}
          />
        ) : null}
      </div>
    </main>
  );
};

export default Search;
