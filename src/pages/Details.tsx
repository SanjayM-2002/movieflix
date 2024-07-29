import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import VideoPlayer from '../components/VideoPlayer';
import CreditsSlider from '../components/CreditsSlider';

const Details: React.FC = () => {
  const params = useParams();
  const [content, setContent] = useState<any>(null);
  const [video, setVideo] = useState<string | undefined>(undefined);
  const [credits, setCredits] = useState<any[]>([]);
  const titleName = content?.name || content?.title || '';
  const id = params.movieid || '';
  const _media_type = params.mediatype?.toLowerCase() || '';
  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const img_not_available = '/img_not_available.jpg';
  const baseImageUrl = 'https://image.tmdb.org/t/p/w300';

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/${_media_type}/${id}?api_key=${API_KEY}&language=en-US`
      );
      setContent(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchVideo = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${_media_type}/${id}/videos?api_key=${API_KEY}&language=en-US`
      );
      setVideo(data.results[0]?.key);
    } catch (error) {
      console.error(error);
    }
  };

  const creditsFetch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${_media_type}/${id}/credits?api_key=${API_KEY}&language=en-US`
      );
      setCredits(data.cast);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
    creditsFetch();
  }, [id, _media_type]);

  const ImageURL = content?.poster_path
    ? `${baseImageUrl}/${content.poster_path}`
    : img_not_available;
  const tagline = content?.tagline || '';
  const vote_average = parseInt(content?.vote_average || '0');
  const original_language = content?.original_language || '';
  const origin_country =
    content?.origin_country?.[0] ||
    content?.production_countries?.[0]?.name ||
    '';
  const overview = content?.overview || '';
  const first_air_date = content?.first_air_date || content?.release_date;
  const budget = content?.budget || '';
  const genres =
    content?.genres?.map((item: any) => (
      <span
        key={item.id}
        className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'
      >
        {item.name}
      </span>
    )) || '';

  return (
    <main className='p-6'>
      {titleName ? (
        <>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-2 justify-center items-center bg-gray-800 p-8 rounded-md'>
            <div className='flex flex-col justify-center'>
              <h1 className='text-4xl font-bold mb-2 text-yellow-300'>
                {titleName}
              </h1>
              {tagline && (
                <h3 className='text-xl  mb-4 text-yellow-400'>{tagline}</h3>
              )}
              <img
                src={ImageURL}
                alt={titleName}
                className='w-96 h-96 rounded-lg shadow-md'
              />
            </div>
            <div className='flex flex-col items-center justify-center'>
              <div className='shadow-md items-center'>
                <div className='text-lg font-semibold text-white mb-2'>
                  Avg Rating: {vote_average}
                </div>
                <ul className='text-gray-400 mb-4 space-y-2'>
                  <li>Language: {original_language}</li>
                </ul>
                <ul className='text-gray-400 mb-4 space-y-2'>
                  <li>
                    <span className='font-semibold'>Genre:</span> {genres}
                  </li>
                  <li>
                    <span className='font-semibold'>Type:</span> {_media_type}
                  </li>
                  <li>
                    <span className='font-semibold'>Release year:</span>{' '}
                    {first_air_date}
                  </li>
                  {budget && (
                    <li>
                      <span className='font-semibold'>Budget:</span> {budget}
                    </li>
                  )}
                  <li>
                    <span className='font-semibold'>Country:</span>{' '}
                    {origin_country}
                  </li>
                </ul>
                <p className='text-gray-300'>{overview}</p>
              </div>
            </div>
          </div>
          <section className='mt-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2 justify-around'>
              <VideoPlayer videoKey={video} />
              {credits.length > 0 && <CreditsSlider data={credits} />}
            </div>
          </section>
        </>
      ) : (
        <p className='text-center text-gray-500'>Loading...</p>
      )}
    </main>
  );
};

export default Details;
