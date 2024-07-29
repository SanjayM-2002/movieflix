import { Genre } from '../types';

const useGenres = (selectedGenres: Genre[]): string => {
  if (selectedGenres.length < 1) return '';

  const genreIds = selectedGenres.map((g) => g.id);
  return genreIds.join(',');
};

export default useGenres;
