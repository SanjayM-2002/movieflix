export interface Page {
  name: string;
  link: string;
}

export interface MovieData {
  id: number;
  original_title?: string;
  name?: string;
  poster_path?: string;
  media_type?: string;
  type?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  original_language?: string;
  overview: string;
}

export interface MovieCardProps {
  data: MovieData;
}

export interface PaginationProps {
  maxnum: number;
  activenum: number;
  handleClick: (pageNo: number) => void;
}

export interface CastMember {
  profile_path?: string;
  name: string;
  known_for_department: string;
}

export interface CreditsSliderProps {
  data: CastMember[];
}

export interface VideoPlayerProps {
  videoKey: string | undefined;
}

export interface Genre {
  id: number;
  name: string;
}

export interface FilterBoxProps {
  selectedGenres: Genre[];
  setSelectedGenres: React.Dispatch<React.SetStateAction<Genre[]>>;
  genres: Genre[];
  setGenres: React.Dispatch<React.SetStateAction<Genre[]>>;
  type: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
