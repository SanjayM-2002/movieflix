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
