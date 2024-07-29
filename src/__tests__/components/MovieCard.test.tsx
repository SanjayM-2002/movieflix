import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MovieCard from '../../components/MovieCard';
import { MovieData } from '../../types';
import { RecoilRoot } from 'recoil';
import { describe, expect, it } from 'vitest';

const mockData: MovieData = {
  id: 1,
  name: 'Test Movie',
  overview: 'This is a test movie',
  poster_path: '/test.jpg',
  release_date: '2022-01-01',
  vote_average: 8.5,
  media_type: 'tv',
  type: 'tv',
  original_language: 'en',
};

describe('MovieCard', () => {
  it('renders the movie title', () => {
    render(
      <RecoilRoot>
        <MemoryRouter>
          <MovieCard data={mockData} />
        </MemoryRouter>
      </RecoilRoot>
    );
    const titleElement = screen.getByText(/Test Movie/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the movie release date', () => {
    render(
      <RecoilRoot>
        <MemoryRouter>
          <MovieCard data={mockData} />
        </MemoryRouter>
      </RecoilRoot>
    );
    const releaseDateElement = screen.getByText(/2022-01-01/i);
    expect(releaseDateElement).toBeInTheDocument();
  });

  it('renders the movie vote average', () => {
    render(
      <RecoilRoot>
        <MemoryRouter>
          <MovieCard data={mockData} />
        </MemoryRouter>
      </RecoilRoot>
    );
    const voteAverageElement = screen.getByText(/8/i);
    expect(voteAverageElement).toBeInTheDocument();
  });

  it('renders the movie media type', () => {
    render(
      <RecoilRoot>
        <MemoryRouter>
          <MovieCard data={mockData} />
        </MemoryRouter>
      </RecoilRoot>
    );
    const mediaTypeElement = screen.getByText(/tv/i);
    expect(mediaTypeElement).toBeInTheDocument();
  });

  it('renders the movie original language', () => {
    render(
      <RecoilRoot>
        <MemoryRouter>
          <MovieCard data={mockData} />
        </MemoryRouter>
      </RecoilRoot>
    );
    const languageElement = screen.getByText(/en/i);
    expect(languageElement).toBeInTheDocument();
  });

  it('renders the movie image', () => {
    render(
      <RecoilRoot>
        <MemoryRouter>
          <MovieCard data={mockData} />
        </MemoryRouter>
      </RecoilRoot>
    );
    const imageElement = screen.getByAltText(/Test Movie/i);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w300/test.jpg'
    );
  });
});
